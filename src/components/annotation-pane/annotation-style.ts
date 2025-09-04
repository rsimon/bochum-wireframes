import type { AnnotationState } from '@annotorious/react';
import type { HighlightStyleExpression, TEIAnnotation } from '@recogito/react-text-annotator';

export const AnnotationStyle: HighlightStyleExpression = (
  annotation: TEIAnnotation, 
  state: AnnotationState, 
  z: number
) => {
  const type = (annotation.bodies || []).find(b => b.purpose === 'classifying')?.value;
  if (type === 'metaphor') {
    return {
      fillOpacity: 0,
      underlineColor: '#1a1a1a',
      underlineThickness: 1.5,
      underlineOffset: 1 + 3 * (2 * z || 1)
    }
  } else if (type === 'mrw') {
    return {
      fill: '#00ff00',
      fillOpacity: 0.5
    }
  }
}