import { useAnnotationStore } from '@annotorious/react';
import { TEIAnnotation, TextAnnotationStore } from '@recogito/react-text-annotator';

export const useIntersectingAnnotations = () => {

  const store = useAnnotationStore<TextAnnotationStore>();

  const getIntersecting = (annotation: TEIAnnotation) => {
    if (!store) return [];

    const bounds = store.getAnnotationBounds(annotation.id);
    if (!bounds) return []; // Should never happen

    const { x, y, width, height } = bounds;
        
    const intersecting = store.getIntersecting(x, y, x + width, y + height)
      .filter(rects => rects.annotation.id !== annotation.id)
      .map(rects => rects.annotation)
      .sort((a, b) => a.target.selector[0].start - b.target.selector[0].start);

    return intersecting as TEIAnnotation[];
  }

  return { getIntersecting };

}