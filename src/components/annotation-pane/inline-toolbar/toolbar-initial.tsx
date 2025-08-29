import { Button } from '@/components/ui/button';
import { createBody, useAnnotator } from '@annotorious/react';
import type { RecogitoTEIAnnotator, TEIAnnotation, TextAnnotationPopupContentProps } from '@recogito/react-text-annotator';

export const ToolbarInitial = (props: TextAnnotationPopupContentProps) => {

  const anno = useAnnotator<RecogitoTEIAnnotator>();

  const onSetAnnotationType = (type: 'metaphor' | 'mrw') => () => {
    if (!anno) return;

    const body = createBody(props.annotation, {
      purpose: 'classifying',
      value: type
    });

    const next: TEIAnnotation = {
      ...(props.annotation as TEIAnnotation),
      bodies: [
        ...(props.annotation.bodies || []).filter(b => b.purpose !== 'classifying'),
        body
      ]
    }

    anno.state.store.updateAnnotation(next);
  }

  return (
    <div>
      <Button 
        value="metaphor"
        variant="ghost"
        className="gap-1.5 px-2.5 rounded-sm cursor-pointer"
        onClick={onSetAnnotationType('metaphor')}>
        <div className="text-xs h-5 flex items-center justify-center underline underline-offset-2 mb-[1px]">M</div>
        <div className="font-normal">Metaphor</div> 
      </Button>

      <Button 
        value="mrw"
        variant="ghost"
        className="gap-1.5 px-2.5 rounded-sm cursor-pointer"
        onClick={onSetAnnotationType('mrw')}>
        <div className="text-[10px] bg-lime-200 text-lime-700 rounded-xs size-5 flex items-center justify-center">W</div>
        <div className="font-normal">Word</div> 
      </Button>
    </div>
  )

}