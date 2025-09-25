import { getAnnotationType } from '@/text-annotation/utils';
import { Store, useAnnotationStore, useSelection, type AnnotationState } from '@annotorious/react';
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
      fill: '#1a1a1a',
      fillOpacity: 0.07,
      underlineColor: '#1a1a1a',
      underlineThickness: 1,
      underlineOffset: 4 * z
    }
  } else {
    return {
      fill: '#e60076', 
      fillOpacity: 0.35
    }
  }
}

const WHEN_SELECTION = (emphasized: string[]): HighlightStyleExpression => (
  annotation: TEIAnnotation, 
  state: AnnotationState, 
  z: number
) => {
  const type = getAnnotationType(annotation);
  const isEmphasized = emphasized.includes(annotation.id) || state.selected;

  if (type === 'metaphor') {
    return {
      fill: '#1a1a1a',
      fillOpacity: isEmphasized ? 0.07 : 0.03,
      underlineColor: isEmphasized ? '#1a1a1a' : '#e2e2e2',
      underlineThickness: 1,
      underlineOffset: 4 * z
    }
  } else {
    return {
      fill: isEmphasized ? '#e60076' : '#1a1a1a', 
      fillOpacity: isEmphasized ? 0.35 : 0.07 
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