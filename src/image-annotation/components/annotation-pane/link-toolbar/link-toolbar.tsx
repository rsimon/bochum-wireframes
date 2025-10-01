import { Tag, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { WirePopupProps } from '@annotorious/plugin-wires-react';
import { useAnnotationStore } from '@annotorious/react';
import { Separator } from '@/components/ui/separator';
import { VocabularySearch } from '@/components/vocabulary-search';

export const LinkToolbar = (props: WirePopupProps) => {

  const store = useAnnotationStore();

  const onDelete = () => {
    if (!store) return;
    store.deleteAnnotation(props.annotation.id);
  }

  return (
    <div className="bg-white p-1 rounded-lg flex gap-1 items-center
      shadow-[0_4px_12px_rgba(0,0,0,0.1),0_20px_40px_rgba(0,0,0,0.06)]">

      <Tooltip>
        <VocabularySearch>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="relative">
              <Tag className="size-3.5" />
            </Button>
          </TooltipTrigger>
        </VocabularySearch>

        <TooltipContent>
          <p>Add relationship tag</p>
        </TooltipContent>
      </Tooltip>

      <Separator orientation="vertical" />

      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            onClick={onDelete}>
            <Trash2 className="size-3.5 text-destructive" />
          </Button>
        </TooltipTrigger>

        <TooltipContent>
          <p>Delete annotation</p>
        </TooltipContent>
      </Tooltip>
    </div>
  )

}