import { useCallback, useState } from 'react';
import { RecogitoTEIAnnotator, TEIAnnotation, TextAnnotationPopup } from '@recogito/react-text-annotator';
import { useSelection, useAnnotator } from '@annotorious/react';
import { TooltipProvider } from '@/components/ui/tooltip';
import { ToolbarInitial } from './toolbar-initial';

interface InlineToolbarProps {

  onClickAdvanced(): void;

}

export const InlineToolbar = (props: InlineToolbarProps) => {

  const { onClickAdvanced } = props;

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
      placement="bottom"
      popup={
        props => (
          <div className="bg-white p-1.5 rounded-md shadow-[0_0px_1px_rgba(0,0,0,0.35),2px_4px_12px_rgba(0,0,0,0.08),2px_20px_34px_rgba(0,0,0,0.08)]">
            {state === 'initial' ? (
              <ToolbarInitial 
                {...props} 
                onClickAdvanced={onClickAdvanced} />
            ) : null}
          </div>
        )
      } 
      onClose={onClose} />
  )

}