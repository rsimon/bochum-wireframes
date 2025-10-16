import { useMemo } from 'react';
import { Ellipsis, MessagesSquare, Tag, Trash2, X } from 'lucide-react';
import { createBody, ImageAnnotation, PopupProps, Store, useAnnotationStore } from '@annotorious/react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { Separator } from '@/components/ui/separator';
import { SetCategory } from '@/image-annotation/components/shared';
import { getCategoryColor } from '@/image-annotation/colors';

interface ShapeToolbarProps extends PopupProps {

  annotation: ImageAnnotation;

  onClickAdvanced(): void;

}

export const ShapeToolbar = (props: ShapeToolbarProps) => {

  const store = useAnnotationStore<Store<ImageAnnotation>>();

  const onDelete = () =>
    store.deleteAnnotation(props.annotation.id);

  const category = useMemo(() => {
    return props.annotation.bodies.find(b => b.purpose === 'classifying')?.value
  }, [props.annotation]);

  const onSetCategory = (value: string) =>
    store.addBody(createBody(props.annotation, {
      purpose: 'classifying',
      value
    }));

  const onClearCategory = () => {
    const categoryBody = props.annotation.bodies.find(b => b.purpose === 'classifying');
    store.deleteBody(categoryBody);
  }

  return (
    <div className="bg-white p-1 rounded-lg flex gap-0.5
      shadow-[0_4px_12px_rgba(0,0,0,0.1),0_20px_40px_rgba(0,0,0,0.06)]">
      {category ? (
        <div className={`text-xs tracking-wide font-medium text-white flex gap-0.5 px-1 items-center rounded-md ${getCategoryColor(category)}`}>
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
        <SetCategory onSetCategory={onSetCategory}>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="relative">
                <Tag className="size-3.5" />
              </Button>
            </TooltipTrigger>

            <TooltipContent>
              <p>Add concept tag</p>
            </TooltipContent>
          </Tooltip>
        </SetCategory>
      )}

      <div className="flex items-center mx-0.5"> 
        <Separator orientation="vertical" />
      </div>

      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="relative">
            <MessagesSquare className="size-3.5" />

            <Badge 
              className="absolute z-10 top-0 -right-[1px] text-[9px] font-semibold rounded-full aspect-square p-1 bg-slate-800 pointer-none:">
              3
            </Badge>
          </Button>
        </TooltipTrigger>

        <TooltipContent>
          <p>Comment</p>
        </TooltipContent>
      </Tooltip>

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

      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            onClick={props.onClickAdvanced}>
            <Ellipsis className="size-3.5" />
          </Button>
        </TooltipTrigger>

        <TooltipContent>
          <p>More</p>
        </TooltipContent>
      </Tooltip>
    </div>
  )

}