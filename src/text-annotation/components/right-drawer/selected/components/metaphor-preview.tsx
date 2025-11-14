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
      const linkedAnnotations = props.linked.map(id => store.getAnnotation(id)).filter(Boolean);
      return interleaveLinkedAnnotations(props.annotation, linkedAnnotations);
    }
  }, [store, props.annotation, props.linked]);

  return tokens && (
    <div className="font-serif text-sm bg-muted rounded mt-8 mb-4 italic p-4 leading-relaxed">
      {tokens.map(({ value, type }, index) => (
        <span 
          key={`${value}:${index}`}
          className={
            type === 'word' ? 'bg-pink-200 py-0.5 px-1 rounded-xs' : ''
          }>{value}{'\u00A0'}</span> 
      ))}
    </div>
  )

}