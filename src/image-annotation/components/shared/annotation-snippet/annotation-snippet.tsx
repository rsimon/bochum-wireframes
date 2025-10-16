import { useMemo } from 'react';
import clsx from 'clsx';
import { CozyCanvas } from 'cozy-iiif';
import { useAnnotation } from '@annotorious/react';

interface AnnotationSnippetProps {

  className?: string;

  annotation: string;

  canvas: CozyCanvas;

}

export const AnnotationSnippet = (props: AnnotationSnippetProps) => {
  
  const annotation = useAnnotation(props.annotation);

  const image = props.canvas.images[0];
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
    <img 
      src={url} 
      className={clsx('object-cover', props.className)} />
  )

}