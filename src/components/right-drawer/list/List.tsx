import { useMemo } from 'react';
import { useAnnotations } from '@annotorious/react';
import { TEIAnnotation } from '@recogito/react-text-annotator';
import { ScrollArea } from '@/components/ui/scroll-area';
import { getAnnotationType, sortAnnotationsByCharPosition } from '@/utils';
import { ListCard } from './ListCard';

export const List = () => {

  const annotations = useAnnotations<TEIAnnotation>(250);

  const grouped: [TEIAnnotation, TEIAnnotation[]][] = useMemo(() => {
    const metaphors = annotations.filter(a => getAnnotationType(a) === 'metaphor');

    const words = annotations.filter(a => getAnnotationType(a) === 'mrw');

    const linkedWordIds = new Set(metaphors.reduce<string[]>((ids, metaphor) => {
      const linkedIds = metaphor.bodies.filter(b => b.purpose === 'linking' && b.value).map(b => b.value);
      return [...ids, ...linkedIds];
    }, []));

    // Metaphors or words that are not currently linked to a metaphor
    const rootAnnotations = sortAnnotationsByCharPosition([
      ...metaphors,
      ...words.filter(a => !linkedWordIds.has(a.id))
    ]);

    const getLinkedAnnotations = (annotation: TEIAnnotation) => {
      const linkedIds = annotation.bodies.filter(b => b.purpose === 'linking' && b.value).map(b => b.value);
      return linkedIds.map(id => annotations.find(a => a.id === id)).filter(Boolean);
    }

    return rootAnnotations.map(root => ([
      root, getLinkedAnnotations(root)
    ]));
  }, [annotations]);

  return (
    <ScrollArea className="h-full p-4">
      {grouped.map(([root, linked]) => (
        <ListCard 
          annotation={root}
          linked={linked} />
      ))}
    </ScrollArea>
  );

}