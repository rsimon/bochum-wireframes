import { useMemo } from 'react';
import { Tag, Trash2, X } from 'lucide-react';
import { createBody, useAnnotator } from '@annotorious/react';
import { ArrowPopupProps } from '@annotorious/plugin-arrows-react';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { Separator } from '@/components/ui/separator';
import { VocabularySearch } from '@/components/vocabulary-search';
import { VocabularyTerm } from '@/components/vocabulary-search/dummy-vocabulary';
import { getCategoryColor } from '@/image-annotation/colors';

export const LinkToolbar = (props: ArrowPopupProps) => {

  const anno = useAnnotator();

  const category = useMemo(() => 
    props.annotation.bodies.find(b => b.purpose === 'classifying')?.value
  , [props.annotation]);

  const onSetCategory = (term: VocabularyTerm) => {
    if (!anno) return;

    const updated = {
      ...props.annotation,
      bodies: [
        ...props.annotation.bodies.filter(b => b.purpose !== 'classifying'),
        createBody(props.annotation, { purpose: 'classifying', value: term.id })
      ]
    };

    anno.state.store.updateAnnotation(updated);
    anno.state.selection.clear();
  }

  const onClearCategory = () => {
    const categoryBody = props.annotation.bodies.find(b => b.purpose === 'classifying');
    anno.state.store.deleteBody(categoryBody);
  }

  const onDelete = () => {
    if (!anno) return;
    anno.state.store.deleteAnnotation(props.annotation.id);
  }

  return (
    <div className="bg-white p-1 rounded-lg flex gap-1 items-center
      shadow-[0_4px_12px_rgba(0,0,0,0.1),0_20px_40px_rgba(0,0,0,0.06)]">
      {category ? (
        <div className="text-xs tracking-wide font-medium h-9 text-white bg-gray-500 flex gap-0.5 px-1 items-center rounded-md">
          <span className="pl-1.5">
            {category} 
          </span>

          <Button
            variant="ghost"
            size="icon"
            className="p-0 hover:bg-white/15 rounded-full size-7"
            onClick={onClearCategory}>
            <X className="size-3 text-white" />
          </Button>
        </div>
      ) : (
        <Tooltip>
          <VocabularySearch
            onSelect={onSetCategory}>
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
      )}

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
          <p>Delete relation</p>
        </TooltipContent>
      </Tooltip>
    </div>
  )

}