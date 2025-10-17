import { useMemo, useState } from 'react';
import clsx from 'clsx';
import { CozyCanvas } from 'cozy-iiif';
import { useAnnotation } from '@annotorious/react';
import { Skeleton } from '@/components/ui/skeleton';

interface AnnotationSnippetProps {

  className?: string;

  annotation: string;

  canvas: CozyCanvas;

}

export const AnnotationSnippet = (props: AnnotationSnippetProps) => {
  
  const annotation = useAnnotation(props.annotation);

  const [isLoading, setIsLoading] = useState(true);

  const image = props.canvas.images[0];

  // Not needed for the wireframe demo
  if (image.type !== 'dynamic') return null;

  const bounds = useMemo(() => {
    const { bounds } = annotation.target.selector.geometry;

    return {
      x: bounds.minX,
      y: bounds.minY,
      w: bounds.maxX - bounds.minX,
      h: bounds.maxY - bounds.minY
    };
  }, [annotation]);

  const url = image.getRegionURL(bounds, { minSize: 400 });

  return (
    <div>
      {isLoading && (
        <Skeleton className={props.className} />
      )}
      <img 
        src={url} 
        className={clsx('object-cover', props.className, isLoading && 'hidden')} 
        onLoad={() => setIsLoading(false)} />
    </div>
  )

}