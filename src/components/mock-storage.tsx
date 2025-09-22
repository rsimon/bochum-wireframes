
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
      const onAction = () => {
        // It's a mock after all...   
        props.onChangeSaveStatus(true);
        setTimeout(() => props.onChangeSaveStatus(false), 500);
      }

      const onCreate = (a: TextAnnotation) => {
        onAction();
        console.log('created', a.target.selector);
      }

      r.on('createAnnotation', onCreate);
      r.on('updateAnnotation', onAction);
      r.on('deleteAnnotation', onAction);

      return () => {
        r.off('createAnnotation', onCreate);
        r.off('updateAnnotation', onAction);
        r.off('deleteAnnotation', onAction);
      }
    }
  }, [r]);

  return null;

}
