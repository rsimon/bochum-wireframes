import { useCallback, useState } from 'react';
import { RecogitoTEIAnnotator, TEIAnnotation, TextAnnotationPopup } from '@recogito/react-text-annotator';
import { ToolbarInitial } from './toolbar-initial';
import { useSelection, useAnnotator } from '@annotorious/react';

interface InlineToolbarProps {

}

export const InlineToolbar = (props: InlineToolbarProps) => {

  const [state, setState] = useState('initial');

  const anno = useAnnotator<RecogitoTEIAnnotator>();

  const selection = useSelection<TEIAnnotation>();

  const onClose = useCallback(() => {
    const { previous } = selection;
    
    // Should never happen (after close, there's always a previous)
    if (previous.length === 0) return;

    const isEmpty = previous[0].annotation.bodies.length === 0;
    if (isEmpty)
      anno.removeAnnotation(previous[0].annotation);
  }, [selection]);

  return (
    <TextAnnotationPopup
      popup={
        props => (
          <div className="bg-white p-2 shadow-[0_0px_2px_rgba(0,0,0,0.12),2px_8px_18px_rgba(0,0,0,0.09)] rounded">
            {state === 'initial' ? (
              <ToolbarInitial {...props} />
            ) : null}
          </div>
        )
      } 
      onClose={onClose} />
  )

}