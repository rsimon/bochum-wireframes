import { useEffect } from 'react';
import { useAnnotator } from '@annotorious/react';
import { RecogitoTextAnnotator, TextAnnotation } from '@recogito/react-text-annotator';

export const MockStorage = () => {

  const r = useAnnotator<RecogitoTextAnnotator>();

  useEffect(() => {
    if (r) {
      r.on('createAnnotation', (annotation: TextAnnotation) => {
        console.log('create', annotation);

        const { store } = r.state;

        const bounds = store.getAnnotationBounds(annotation.id);
        if (!bounds) return; // Should never happen

        const { x, y, width, height } = bounds;
        
        const intersecting = store.getIntersecting(x, y, x + width, y + height)
          .filter(rects => rects.annotation.id !== annotation.id)
          .map(rects => rects.annotation)
          .sort((a, b) => a.target.selector[0].start - b.target.selector[0].start)

        if (intersecting.length > 0) {
          const quotes = intersecting.map(a => a.target.selector.map(s => s.quote).join(' '));
          alert('Intersects: ' + quotes.join(', '));
        }
      });

      r.on('deleteAnnotation', (annotation: TextAnnotation) => {
        console.log('delete', annotation);
      });

      r.on('selectionChanged', (annotations: TextAnnotation[]) => {
        console.log('selection changed', annotations);
      });

      r.on('updateAnnotation', (annotation: TextAnnotation, previous: TextAnnotation) => {
        console.log('update', annotation, previous);
      });
    }
  }, [r]);

  return null;

}
