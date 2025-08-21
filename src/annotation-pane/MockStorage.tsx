import { useEffect } from 'react';
import { useAnnotator } from '@annotorious/react';
import { RecogitoTextAnnotator, TextAnnotation } from '@recogito/react-text-annotator';

export const MockStorage = () => {

  const r = useAnnotator<RecogitoTextAnnotator>();

  useEffect(() => {
    if (r) {
      r.on('createAnnotation', (annotation: TextAnnotation) => {
        console.log('create', annotation);
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
