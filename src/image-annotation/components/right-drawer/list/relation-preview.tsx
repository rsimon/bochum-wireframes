import { ArrowAnnotation } from '@annotorious/plugin-arrows-react';
import { ArrowAnchor, isArrowAnchor, Point } from '@annotorious/plugin-arrows';
import { CozyCanvas } from 'cozy-iiif';
import { AnnotationSnippet } from '../../shared/annotation-snippet';
import { useMemo } from 'react';

interface RelationPreviewProps {

  arrow: ArrowAnnotation;

  canvas: CozyCanvas;

  referenceAnnotationId: string;

}

export const RelationPreview = (props: RelationPreviewProps) => {

  const { start, end } = props.arrow.target.selector;

  const isArrowLTR = useMemo(() =>
    isArrowAnchor(start) && start.annotationId === props.referenceAnnotationId
  , [start, end, props.referenceAnnotationId]);

  const renderEdge = (a: Point | ArrowAnchor) => isArrowAnchor(a) ? (
    <AnnotationSnippet 
      annotation={a.annotationId} 
      canvas={props.canvas} />
  ) : null;

  return (
    <div 
      className="flex justify-between items-center gap-2">
      {isArrowLTR ? renderEdge(start) : renderEdge(end)}

      <div className="grow relative self-stretch mb-0.5">
        <div className="absolute w-full left-0 top-1/2 h-[1px] border-dashed border-t border-gray-400" />
        {isArrowLTR ? (
          <div className="absolute -right-1 flex items-center h-full">
            <div className="border-t-4 translate-y-[0.5px] border-t-transparent border-b-4 border-b-transparent border-l-8 border-l-gray-400" />
          </div>
        ) : (
          <div className="absolute -left-1 flex items-center h-full">
            <div className="border-t-4 translate-y-[0.5px] border-t-transparent border-b-4 border-b-transparent border-r-8 border-r-gray-400" />
          </div>
        )}
      </div>

      {isArrowLTR ? renderEdge(end) : renderEdge(start)}
    </div>
  )

}