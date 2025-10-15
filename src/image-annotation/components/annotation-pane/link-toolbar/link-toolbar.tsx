import { Tag, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { createBody, useAnnotator } from '@annotorious/react';
import { Separator } from '@/components/ui/separator';
import { VocabularySearch } from '@/components/vocabulary-search';
import { VocabularyTerm } from '@/components/vocabulary-search/dummy-vocabulary';

export const LinkToolbar = () => {

  const anno = useAnnotator();

  /*
  const onAddTag = (term: VocabularyTerm) => {
    if (!anno) return;

    const currentTags = props.annotation.bodies.filter(b => b.purpose === 'tagging');

    // Don't add twice
    if (currentTags.some(b => b.value === term.id)) return;

    const nextTags = [...currentTags, createBody(props.annotation, { purpose: 'tagging', value: term.id })];

    const updated = {
      ...props.annotation,
      bodies: [
        ...props.annotation.bodies.filter(b => b.purpose !== 'tagging'),
        ...nextTags
      ]
    };

    anno.state.store.updateAnnotation(updated);
    anno.state.selection.clear();
  }

  const onDelete = () => {
    if (!anno) return;
    anno.state.store.deleteAnnotation(props.annotation.id);
  }
  */

  /*
  return (
    <div className="bg-white p-1 rounded-lg flex gap-1 items-center
      shadow-[0_4px_12px_rgba(0,0,0,0.1),0_20px_40px_rgba(0,0,0,0.06)]">

      <Tooltip>
        <VocabularySearch
          onSelect={onAddTag}>
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
  */
 
  return null;

}