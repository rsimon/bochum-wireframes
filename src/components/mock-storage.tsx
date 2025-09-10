
import { useEffect } from 'react';
import { useAnnotator } from '@annotorious/react';
import { RecogitoTextAnnotator, TextAnnotation } from '@recogito/react-text-annotator';

interface MockStorageProps {

  onChangeSaveStatus(saving: boolean): void;

}

export const MockStorage = (props: MockStorageProps) => {

  const r = useAnnotator<RecogitoTextAnnotator>();

  useEffect(() => {
    if (r) {
      const onAction = (annotation: TextAnnotation) => {
        // It's a mock after all...   
        props.onChangeSaveStatus(true);
        setTimeout(() => props.onChangeSaveStatus(false), 500);
      }

      r.on('createAnnotation', onAction);
      r.on('updateAnnotation', onAction);
      r.on('deleteAnnotation', onAction);

      return () => {
        r.off('createAnnotation', onAction);
        r.off('updateAnnotation', onAction);
        r.off('deleteAnnotation', onAction);
      }
    }
  }, [r]);

  return null;

}
