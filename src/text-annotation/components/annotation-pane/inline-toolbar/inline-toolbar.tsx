import { useCallback } from 'react';
import { RecogitoTEIAnnotator, TEIAnnotation, TextAnnotationPopup } from '@recogito/react-text-annotator';
import { useSelection, useAnnotator } from '@annotorious/react';
import { ToolbarStateChoice } from './toolbar-state-choice';
import { ToolbarStateSelected } from './toolbar-state-selected';

interface InlineToolbarProps {

  onOpenSelectedSidebar(): void;

  onOpenListSidebar(): void;

}

export const InlineToolbar = (props: InlineToolbarProps) => {

  const { onOpenSelectedSidebar, onOpenListSidebar } = props;

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

  const onSelectChoice = (annotation: TEIAnnotation) =>
    anno?.setSelected(annotation.id);

  return (
    <TextAnnotationPopup
      placement="bottom"
      popup={
        props => props.selected.length > 1 ? (
          <ToolbarStateChoice 
            {...props} 
            onSelect={onSelectChoice} 
            onOpenList={onOpenListSidebar} />
        ) : (
          <ToolbarStateSelected 
            {...props} 
            onClickAdvanced={onOpenSelectedSidebar} />
        )
      } 
      onClose={onClose} />
  )

}