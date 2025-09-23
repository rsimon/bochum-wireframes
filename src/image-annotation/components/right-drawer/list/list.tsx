import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ImageAnnotation, useAnnotations, useSelection } from '@annotorious/react';
import { ArrowDownWideNarrow, Search } from 'lucide-react';
import { ListCard } from './list-card';
import { useMemo } from 'react';

export const List = () => {

  const unfiltered = useAnnotations<ImageAnnotation>(250);

  const annotations = useMemo(() =>
    unfiltered.filter(a => !('motivation' in a) || a.motivation !== 'linking')
  , [unfiltered]);

  const { selected } = useSelection<ImageAnnotation>();
  
  const hasSelection = selected.length > 0;
  
  const isSelected = (annotation: ImageAnnotation) =>
    selected.some(t => t.annotation.id === annotation.id);

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

          <Select defaultValue="created">
            <SelectTrigger 
              size="sm"
              className="border-0 shadow-none h-auto! py-0 px-1 text-xs gap-1">
              <SelectValue />
            </SelectTrigger>

            <SelectContent>
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
        {annotations.map(annotation => (
          <ListCard 
            key={annotation.id}
            annotation={annotation} 
            emphasize={hasSelection && isSelected(annotation)}
            deemphasize={hasSelection && !isSelected(annotation)} />
        ))}
      </div>
    </ScrollArea>
  )

}