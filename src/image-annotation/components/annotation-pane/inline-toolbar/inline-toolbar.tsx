import { Ellipsis, MessagesSquare, Plus, Spline, Trash2, X } from 'lucide-react';
import { ImageAnnotation, PopupProps, Store, useAnnotationStore } from '@annotorious/react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { Separator } from '@/components/ui/separator';

interface InlineToolbarProps extends PopupProps {

  onClickAdvanced(): void;

}

export const InlineToolbar = (props: InlineToolbarProps) => {

  const store = useAnnotationStore<Store<ImageAnnotation>>();

  const onDelete = () =>
    store.deleteAnnotation(props.annotation.id);

  return (
    <div className="bg-white p-1 rounded-lg flex gap-0.5
      shadow-[0_4px_12px_rgba(0,0,0,0.1),0_20px_40px_rgba(0,0,0,0.06)]">
      
      <div className="text-xs tracking-wide font-semibold text-cyan-900 flex gap-1 px-1 items-center rounded-md bg-cyan-400">
        <span className="pl-1.5">MyConcept</span>
        <Button
          variant="ghost"
          size="icon"
          className="p-0 hover:bg-white/40 rounded-full size-7">
          <X className="size-3" />
        </Button>
      </div>

      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="relative">
            <Plus className="size-3.5" />
          </Button>
        </TooltipTrigger>

        <TooltipContent>
          <p>Add concept tag</p>
        </TooltipContent>
      </Tooltip>

      <div className="flex items-center mx-0.5"> 
        <Separator orientation="vertical" />
      </div>

      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="relative">
            <Spline className="size-3.5" />
          </Button>
        </TooltipTrigger>

        <TooltipContent>
          <p>Create link</p>
        </TooltipContent>
      </Tooltip>

      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="relative">
            <MessagesSquare className="size-3.5" />

            <Badge 
              className="absolute z-10 top-0 -right-[1px] text-[9px] font-semibold rounded-full aspect-square p-1 bg-sky-800 pointer-none:">
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