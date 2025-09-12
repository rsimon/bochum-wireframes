import { useMemo } from 'react';
import { useAnnotations, useSelection } from '@annotorious/react';
import { TEIAnnotation } from '@recogito/react-text-annotator';
import { ScrollArea } from '@/components/ui/scroll-area';
import { getAnnotationType, sortAnnotationsByCharPosition } from '@/text-annotation/utils';
import { ListCard } from './list-card';
import { ArrowDownWideNarrow, Search } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';

export const List = () => {

  const annotations = useAnnotations<TEIAnnotation>(250);

  const { selected } = useSelection<TEIAnnotation>();

  const hasSelection = selected.length > 0;

  const isSelected = (annotation: TEIAnnotation) =>
    selected.some(t => t.annotation.id === annotation.id);

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
    <ScrollArea className="h-full p-1">
      <div className="flex justify-between items-center text-muted-foreground mb-2">
        <div className="flex items-center">
          <Button
            size="icon"
            variant="ghost"
            className="p-1 rounded-xs h-auto w-auto">
            <ArrowDownWideNarrow
              className="size-3.5" /> 
          </Button>

          <Select defaultValue="natural">
            <SelectTrigger 
              size="sm"
              className="border-0 shadow-none h-auto! py-0 px-1 text-xs gap-1">
              <SelectValue />
            </SelectTrigger>

            <SelectContent>
              <SelectItem
                value="natural">
                Text order
              </SelectItem>

              <SelectItem
                value="created">
                Created
              </SelectItem>

              <SelectItem
                value="updated">
                Updated
              </SelectItem>
            </SelectContent>
          </Select> 
        </div>

        <div className="flex items-center gap-2">
          <Select defaultValue="all">
            <SelectTrigger 
              size="sm"
              className="border-0 shadow-none h-auto! py-0 px-1 text-xs gap-1">
              <SelectValue />
            </SelectTrigger>

            <SelectContent>
              <SelectItem value="all">
                Show all
              </SelectItem>

              <SelectItem value="viewport">
                Current viewport
              </SelectItem>
            </SelectContent>
          </Select>
          <Search className="size-3.5 mr-0.5" />
        </div>
      </div>

      <div className="p-2">
        {grouped.map(([root, linked], index) => (
          <ListCard 
            annotation={root}
            emphasize={hasSelection && isSelected(root)}
            deemphasize={hasSelection && !isSelected(root)}
            linked={linked} 
            hasPresence={index === 2} />
        ))}
      </div>
    </ScrollArea>
  );

}