import { createBody, TEIAnnotation } from '@recogito/react-text-annotator';
import { AnnotationType } from './types';

export const getAnnotationType = (annotation: TEIAnnotation): AnnotationType => 
  (annotation.bodies || []).find(b => b.purpose === 'classifying')?.value as AnnotationType;

export const getQuote = (annotation: TEIAnnotation): string =>
  annotation.target.selector.map(s => s.quote).join(' ');

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

export const renderMetaphorQuote = (metaphor: TEIAnnotation, linked: TEIAnnotation[]) => {
  const linkedSelectors = linked.flatMap(a => a.target.selector);

  // Interleave every selector separately
  const allSegments = metaphor.target.selector.flatMap(selector => {
    console.log('selector', selector);

    const linkedInThisSelector = 
      linkedSelectors
        .sort((a, b) => a.start - b.start)
        .filter(s => s.end > selector.start && s.start < selector.end);

    console.log(linkedInThisSelector);

    // Split selector
    if (linkedInThisSelector.length === 0) 
      return [[selector.quote, 'metaphor'] as [string, string]];

    const segments: [string, string][] = [];
    let currentPos = selector.start;

    for (const linkedSelector of linkedInThisSelector) {
      const overlapStart = Math.max(currentPos, linkedSelector.start);
      const overlapEnd = Math.min(selector.end, linkedSelector.end);

      // Add metaphor segment before the overlap (if any)
      if (currentPos < overlapStart) {
        const metaphorQuote = selector.quote.slice(
          currentPos - selector.start, 
          overlapStart - selector.start
        );
        console.log('adding metaphor span', metaphorQuote);
        segments.push([metaphorQuote, 'metaphor']);
      }

      // Add the overlapping segment as 'word'
      if (overlapStart < overlapEnd) {
        const wordQuote = selector.quote.slice(
          overlapStart - selector.start,
          overlapEnd - selector.start
        );
        console.log('adding word span', overlapStart, overlapEnd, wordQuote);
        segments.push([wordQuote, 'mrw']);
        currentPos = overlapEnd;
      }
    }

    // Add remaining metaphor segment after all overlaps
    if (currentPos < selector.end) {
      const remainingText = selector.quote.slice(currentPos - selector.start);
      segments.push([remainingText, 'metaphor']);
    }

    return segments;
  });

  return allSegments;
}