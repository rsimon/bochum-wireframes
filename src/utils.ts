import { createBody, TEIAnnotation } from '@recogito/react-text-annotator';
import { AnnotationType } from './types';

export const getAnnotationType = (annotation: TEIAnnotation): AnnotationType => 
  (annotation.bodies || []).find(b => b.purpose === 'classifying')?.value as AnnotationType;

export const setAnnotationType = (annotation: TEIAnnotation, type: AnnotationType): TEIAnnotation => {
  const body = createBody(annotation, {
    purpose: 'classifying',
    value: type
  });

  return {
    ...annotation,
    bodies: [
      ...(annotation.bodies || []).filter(b => b.purpose !== 'classifying'),
      body
    ]
  }
}