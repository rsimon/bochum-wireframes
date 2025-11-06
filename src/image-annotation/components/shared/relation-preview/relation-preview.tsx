import { useMemo } from 'react';
import clsx from 'clsx';
import { CozyCanvas } from 'cozy-iiif';
import { Annotation, useAnnotation } from '@annotorious/react';
import { ArrowAnnotation, isArrowAnchor } from '@annotorious/plugin-arrows-react';
import { getCategoryColor } from '@/image-annotation/colors';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card';
import { cn } from '@/lib/utils';
import { AnnotationSnippet } from '../annotation-snippet';

interface RelationPreviewProps {

  arrow: ArrowAnnotation;

  canvas?: CozyCanvas;

  className?: string;

  referenceAnnotationId?: string;

}

export const RelationPreview = (props: RelationPreviewProps) => {

  const { start, end } = props.arrow.target.selector;

  const isArrowLTR = useMemo(() => {
    if (!props.referenceAnnotationId) return true;
    return (isArrowAnchor(start) && start.annotationId === props.referenceAnnotationId)
  }, [start, end, props.referenceAnnotationId]);

  const startAnnotation = isArrowAnchor(start) ? useAnnotation(start.annotationId) : null;
  const endAnnotation = isArrowAnchor(end) ? useAnnotation(end.annotationId) : null;

  const category = useMemo(() =>
    props.arrow.bodies.find(b => b.purpose === 'classifying')?.value
  , [props.arrow]);

  const renderEdge = (annotation?: Annotation) => {
    if (annotation) {
      const category = annotation.bodies.find(b => b.purpose === 'classifying')?.value;
      return (
        <HoverCard 
          openDelay={100}> 
          <HoverCardTrigger className="cursor-pointer">
            {category ? (
              <div className="rounded-full whitespace-nowrap text-xs font-medium py-0.5 px-1 flex items-center gap-1.5">
                <div className={clsx('size-2 rounded-full shrink-0', getCategoryColor(category))} />
                {category}
              </div>
            ) : (
              <div className="size-2 mx-1 my-1.5 bg-gray-400 rounded-full" />
            )}
          </HoverCardTrigger>

          <HoverCardContent
            side="top"
            className="p-1.5 relative shadow-xl rounded-lg w-auto">
            {props.canvas && (
              <AnnotationSnippet
                annotation={annotation.id} 
                canvas={props.canvas} 
                className="rounded-md size-24" />
            )}
          </HoverCardContent>
        </HoverCard>
      )
    } else {
      return (
        <div className="size-2 mx-1 border border-gray-400 rounded-full my-1.5" />
      )
    }
  }

  return (
    <div 
      className={cn('flex justify-between bg-gray-50 items-center gap-1 border p-1 rounded-full shadow-xs', props.className)}>
      {isArrowLTR ? renderEdge(startAnnotation) : renderEdge(endAnnotation)}

      <div className="grow relative self-stretch flex justify-center">
        <div className="absolute w-full left-0 top-2.5 h-px border-dashed border-t border-gray-400" />

        {isArrowLTR ? (
          <div className="absolute -right-0.5 flex items-center h-full">
            <div className="border-t-4 translate-y-px border-t-transparent border-b-4 border-b-transparent border-l-8 border-l-gray-400" />
          </div>
        ) : (
          <div className="absolute -left-0.5 flex items-center h-full">
            <div className="border-t-4 translate-y-px border-t-transparent border-b-4 border-b-transparent border-r-8 border-r-gray-400" />
          </div>
        )}

        {category && (
          <div className="text-xs h-full flex items-center justify-center relative max-w-[100px]">
            <div className="flex items-centers min-w-0">
              <div className="bg-gray-50 font-light px-0.5 whitespace-nowrap truncate">
                {category}
              </div>
            </div>
          </div>
        )}
      </div>
      
      {isArrowLTR ? renderEdge(endAnnotation) : renderEdge(startAnnotation)}
    </div>
  )

}