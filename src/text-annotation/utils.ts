import { AnnotationBody, createBody, TEIAnnotation, TEIRangeSelector } from '@recogito/react-text-annotator';
import { AnnotationType } from './types';

export const getAnnotationType = (annotation: TEIAnnotation): AnnotationType => 
  (annotation.bodies || []).find(b => b.purpose === 'classifying')?.value as AnnotationType;

export const getQuote = (annotation: TEIAnnotation): string =>
  annotation.target.selector.map(s => s.quote).join(' [...] ');

export const setAnnotationType = (annotation: TEIAnnotation, type: AnnotationType): TEIAnnotation => {
  const body = createBody(annotation, {
    purpose: 'classifying',
    value: type
  });

  return {
    ...annotation,
    bodies: [
      ...(annotation.bodies || []).filter(b => b.purpose !== 'classifying'),
      body
    ]
  }
}

export const getStartOffset = (a: TEIAnnotation) => {
  const start = a.target.selector.reduce<number>((lowestStart, selector) => {
    const { start } = selector;
    return start < lowestStart ? start : lowestStart;
  }, Infinity);

  return start < Infinity ? start : -1;
}

export const sortAnnotationsByCharPosition = (annotations: TEIAnnotation[]) =>
  [...annotations].sort((a, b) => {
    const startA = getStartOffset(a);
    const startB = getStartOffset(b);
    return startA - startB;
  });

export const interleaveLinkedAnnotations = (metaphor: TEIAnnotation, words: TEIAnnotation[]) => {
  const metaphorSelectors = metaphor.target.selector;

  const wordSelectors = words.reduce<TEIRangeSelector[]>((all, word) => 
      [...all, ...word.target.selector], []);

  const getIntersecting = (start: number, end: number) =>
    wordSelectors
      .filter(s => s.end > start && s.start < end)
      .sort((a, b) => a.start - b.start);

  // Shorthand: deflate XML indentation
  const d = (str: string) => str.replace(/\s+/g, ' ')

  const tokens: { value: string, type: 'metaphor' | 'word' }[] = [];

  for (const metaphor of metaphorSelectors) {
    const intersectingWords = getIntersecting(metaphor.start, metaphor.end);

    if (intersectingWords.length === 0) {
      // Nothing to interleave
      tokens.push({ value: d(metaphor.quote), type: 'metaphor' })
    } else {
      // Warning: the `quote` property is a normalized version of the
      // text, with XML indentation removed, whereas the start and 
      // end values point into the un-normalized original markup!
      const metaphorQuote = metaphor.range.toString();

      // Head (metaphor) token, if any
      const headLength = intersectingWords[0].start - metaphor.start;
      if (headLength > 0) {
        // Starts with a metaphor token
        const head = d(metaphorQuote.substring(0, headLength));
        if (head.length > 0) // Don't add if just whitespace
          tokens.push({ value: head, type: 'metaphor' });
      }

      // Loop through intersecting words
      intersectingWords.forEach((word, idx) => {
        tokens.push({ value: d(word.quote), type: 'word' });
        
        if (idx + 1 < intersectingWords.length) {
          // If there's another word, compute interim metaphor token
          const interimStart = word.end - metaphor.start;
          const interimEnd = intersectingWords[idx + 1].start - metaphor.start;

          if (interimEnd > interimStart) {
            const interim = d(metaphorQuote.substring(interimStart, interimEnd));
            if (interim.length > 0) // Don't add if just whitespace
              tokens.push({ value: interim, type: 'metaphor' });
          }
        }
      });

      // Append tail, if any
      const tailLength = metaphor.end - intersectingWords[intersectingWords.length - 1].end;
      if (tailLength > 0) {
        const tail = d(metaphorQuote.substring(metaphorQuote.length - tailLength));
        if (tail.trim().length > 0)
          tokens.push({ value: tail, type: 'metaphor' });
      }
    }
  }

  return tokens;
}

export const isMRWTypeBody = (b: AnnotationBody) =>
  b.purpose === 'classifying' && 'conformsTo' in b && b.conformsTo === 'mrw_type' && b.value;

export const getMRWType = (a: TEIAnnotation) =>
  a.bodies.find(isMRWTypeBody)?.value;

