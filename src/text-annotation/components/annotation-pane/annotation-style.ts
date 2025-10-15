import { getAnnotationType } from '@/text-annotation/utils';
import { Store, useAnnotationStore, useSelection, type AnnotationState } from '@annotorious/react';
import type { HighlightStyleExpression, TEIAnnotation } from '@recogito/react-text-annotator';
import { useMemo } from 'react';

const THEMES = {
  ORANGE: {
    FILL_COLOR_OPAQUE: 'oklch(0.78 0.19 57.08 / 0.75)',
    FILL_COLOR_SEMITRANSPARENT: 'oklch(0.8 0.18 59.17 / 0.14)',
    UNDERLINE_COLOR_OPAQUE: 'oklch(0.78 0.19 57.08 / 0.87)'
  },
  CYAN: {
    FILL_COLOR_OPAQUE: 'oklch(0.72 0.18 237.15 / 0.5)',
    FILL_COLOR_SEMITRANSPARENT: 'oklch(0.72 0.19 232.06 / 0.08)',
    UNDERLINE_COLOR_OPAQUE: 'oklch(0.72 0.19 232.06)',
  }
}

// @ts-ignore
const WHEN_NO_SELECTION = (theme: typeof THEMES[keyof THEMES]): HighlightStyleExpression => (
  annotation: TEIAnnotation, 
  _state: AnnotationState, 
  z: number
) => {
  const type = getAnnotationType(annotation);

  if (type === 'mrw') {
    return {
      fill: theme.FILL_COLOR_OPAQUE
    } 
  } else {
    return {
      fillOpacity: 0,
      underlineColor: theme.UNDERLINE_COLOR_OPAQUE,
      underlineThickness: 2,
      underlineOffset: 4 * z
    }
  }
}

// @ts-ignore
const WHEN_SELECTION = (theme: typeof THEMES[keyof THEMES], emphasized: string[]): HighlightStyleExpression => (
  annotation: TEIAnnotation, 
  state: AnnotationState, 
  z: number
) => {
  const type = getAnnotationType(annotation);
  const isEmphasized = emphasized.includes(annotation.id) || state.selected;

  if (type === 'mrw') {
    return {
      fill: isEmphasized ? theme.FILL_COLOR_OPAQUE : '#1a1a1a', 
      fillOpacity: isEmphasized ? undefined : 0.12 
    }
  } else {
    return {
      fill: isEmphasized ? theme.FILL_COLOR_SEMITRANSPARENT : undefined,
      fillOpacity: isEmphasized ? undefined : 0,
      underlineColor: isEmphasized ? theme.UNDERLINE_COLOR_OPAQUE : '#e2e2ff',
      underlineThickness: 2,
      underlineOffset: 4 * z
    }
  }
}

export const useAnnotationsStyle = (theme = 'ORANGE') => {

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

  return hasSelection ? WHEN_SELECTION(THEMES[theme], emphasized) : WHEN_NO_SELECTION(THEMES[theme]);

}