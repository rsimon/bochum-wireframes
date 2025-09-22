import { getQuote, interleaveLinkedAnnotations } from '@/text-annotation/utils';
import { Store, useAnnotationStore } from '@annotorious/react';
import { TEIAnnotation } from '@recogito/react-text-annotator';
import { useMemo } from 'react';

interface MetaphorPreviewProps {

  annotation: TEIAnnotation;

  linked: string[];

}

export const MetaphorPreview = (props: MetaphorPreviewProps) => {

  const store = useAnnotationStore<Store<TEIAnnotation>>();

  const tokens = useMemo(() => {
    if (!store) return;

    // Shortcut
    if (props.linked.length === 0) {
      return [{ value: getQuote(props.annotation).replace(/\s+/g, ' '), type: 'metaphor' }];
    } else {
      const linkedAnnotations = props.linked.map(id => store.getAnnotation(id));
      return interleaveLinkedAnnotations(props.annotation, linkedAnnotations);
    }
  }, [store, props.annotation, props.linked]);

  return tokens && (
    <div className="font-serif bg-sky-50 text-sky-800 border-sky-700/50 border-l-2 rounded-xs mt-8 mb-4 italic py-4 px-6 min-h-20 leading-relaxed">
      {tokens.map(({ value, type }, index) => (
        <span 
          key={`${value}:${index}`}
          className={
            type === 'word' ? 'bg-green-600/50' : ''
          }>{value}</span>
      ))}
    </div>
  )

}