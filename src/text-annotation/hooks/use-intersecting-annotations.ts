import { useAnnotationStore } from '@annotorious/react';
import { TEIAnnotation, TextAnnotationStore } from '@recogito/react-text-annotator';

export const useIntersectingAnnotations = () => {

  const store = useAnnotationStore<TextAnnotationStore>();

  const rectOverlaps = (a: DOMRect, b: DOMRect) =>
    a.x < b.x + b.width &&
    a.x + a.width > b.x &&
    a.y < b.y + b.height &&
    a.y + a.height > b.y;

  const hasIntersectingRect = (sourceRects: DOMRect[], otherId: string): boolean => {
    const candidateRects = store!.getAnnotationRects(otherId);
    if (!candidateRects || candidateRects.length === 0) return false;

    // True intersection only if at least one rect pair overlaps
    return sourceRects.some(sr => candidateRects.some(cr => rectOverlaps(sr, cr)));
  }

  const getIntersecting = (annotation: TEIAnnotation) => {
    if (!store) return [];

    // Outer bounds - use this to find candidates
    const bounds = store.getAnnotationBounds(annotation.id);
    if (!bounds) return [];

    const { x, y, width, height } = bounds;

    // Individual rects per span - use this to check the actual intersection
    const sourceRects = store.getAnnotationRects(annotation.id);
    if (!sourceRects || sourceRects.length === 0) return []; // Should never happen

    const intersecting = store.getIntersecting(x, y, x + width, y + height)
      .filter(rects => rects.annotation.id !== annotation.id)
      .filter(rects => hasIntersectingRect(sourceRects, rects.annotation.id))
      .map(rects => rects.annotation)
      .sort((a, b) => a.target.selector[0].start - b.target.selector[0].start);

    return intersecting as unknown as TEIAnnotation[];
  }

  return { getIntersecting };

}