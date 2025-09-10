import { getAnnotationType } from '@/text-annotation/utils';
import { Store, useAnnotations, useAnnotationStore, useSelection, type AnnotationState } from '@annotorious/react';
import type { HighlightStyleExpression, TEIAnnotation } from '@recogito/react-text-annotator';
import { useMemo } from 'react';

const WHEN_NO_SELECTION: HighlightStyleExpression = (
  annotation: TEIAnnotation, 
  _state: AnnotationState, 
  z: number
) => {
  const type = getAnnotationType(annotation);

  if (type === 'metaphor') {
    return {
      fillOpacity: 0,
      underlineColor: '#1a1a1a',
      underlineThickness: 1.5,
      underlineOffset: 3 * (2 * z || 1)
    }
  } else if (type === 'mrw') {
    return {
      fill: '#00ff00',
      fillOpacity: 0.5
    }
  }
}

const WHEN_SELECTION = (emphasized: string[]): HighlightStyleExpression => (
  annotation: TEIAnnotation, 
  state: AnnotationState, 
  z: number
) => {
  const type = getAnnotationType(annotation);
  const isEmphasized = emphasized.includes(annotation.id);

  if (type === 'metaphor') {
    return {
      fill: '#1a1a1a',
      fillOpacity: state.selected ? 0.1 : 0,
      underlineColor: '#1a1a1a',
      underlineThickness: 1.5,
      underlineOffset: 3 * (2 * z || 1)
    }
  } else if (type === 'mrw') {
    return {
      fill: '#00ff00',
      fillOpacity: 0.5,
      underlineThickness: isEmphasized ? 1.5 : undefined,
      underlineColor: isEmphasized ? '#ff3300' : undefined
    }
  }
}

export const useAnnotationsStyle = () => {

  const selection = useSelection<TEIAnnotation>();

  const hasSelection = selection.selected.length > 0;

  const store = useAnnotationStore<Store<TEIAnnotation>>();

  const emphasized: string[] = useMemo(() => {
    if (!store) return [];

    if (selection.selected.length === 0) return [];

    const emphasized = selection.selected.reduce<TEIAnnotation[]>((all, { annotation }) => {
      const type = getAnnotationType(annotation);
      if (type === 'mrw') {
        return all;
      } else {
        const linked = Array.from(new Set(
          annotation.bodies.filter(b => b.purpose === 'linking' && b.value).map(b => b.value)
        )).map(id => store.getAnnotation(id)).filter(Boolean);

        return [...all, ...linked];
      }
    }, []);

    return emphasized.map(a => a.id);
  }, [selection.selected, store]);

  return hasSelection ? WHEN_SELECTION(emphasized) : WHEN_NO_SELECTION;

}