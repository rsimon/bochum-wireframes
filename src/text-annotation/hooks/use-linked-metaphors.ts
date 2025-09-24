import { Store, useAnnotationStore } from '@annotorious/react';
import { TEIAnnotation } from '@recogito/react-text-annotator';

export const useLinkedMetaphors = () => {

  const store = useAnnotationStore<Store<TEIAnnotation>>();

  const isLinkedBy = (annotation: TEIAnnotation) => {
    if (!store) return [];
    return store.all().filter(a => a.bodies.some(b => 
      b.purpose === 'linking' && b.value === annotation.id));
  }

  return { 
    isLinkedBy
  }

}