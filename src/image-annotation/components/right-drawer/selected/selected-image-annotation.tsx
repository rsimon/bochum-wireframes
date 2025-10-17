import { useMemo } from 'react';
import clsx from 'clsx';
import { GitCompareArrows, MessagesSquare, Microscope, Shapes, Trash2, X } from 'lucide-react';
import { createBody, ImageAnnotation, useAnnotationStore } from '@annotorious/react';
import { useArrows } from '@annotorious/plugin-arrows-react';
import { getCategoryColor } from '@/image-annotation/colors';
import { Button } from '@/components/ui/button';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { RelationPreview, SetCategory } from '@/image-annotation/components/shared';
import { Badge } from '@/components/ui/badge';
import { SelectedAnnotationDetailsProps } from './selected';
import { Conversation } from '@/components/conversation';
import { ImageAnnotationProperties } from './components';

export const SelectedImageAnnotationDetails = (props: SelectedAnnotationDetailsProps<ImageAnnotation>) => {

  const arrows = useArrows(props.annotation.id);

  const store = useAnnotationStore();

  const category = useMemo(() => 
    props.annotation.bodies.find(b => b.purpose === 'classifying')?.value, [props.annotation]);

  const onSetCategory = (value: string) =>
    store?.addBody(createBody(props.annotation, {
      purpose: 'classifying',
      value
    }));

  const onClearCategory = () => {
    const categoryBody = props.annotation.bodies.find(b => b.purpose === 'classifying');
    store.deleteBody(categoryBody);
  }

  return (
    <div className="grow flex flex-col">
      <div className="p-4">
        {category ? (
          <div className={clsx(
            'rounded-md py-1 pl-2.5 pr-1 text-sm text-white flex items-center justify-between',
            getCategoryColor(category)
            )}>
            {category}

            <Button
              variant="ghost"
              size="icon"
              className="p-0 hover:bg-white/15 size-7"
              onClick={onClearCategory}>
              <X className="size-4 text-white/70" />
            </Button>
          </div>
        ) : (
          <SetCategory 
            onSetCategory={onSetCategory}>
            <button className="w-full rounded border border-input cursor-pointer p-4 bg-muted hover:bg-muted/60 flex items-center justify-center text-sm text-muted-foreground/50">
              <div className="flex gap-2 items-center font-medium py-4">
                <Shapes className="size-6 -rotate-12" strokeWidth={1.75}/> Add class
              </div>
            </button>
          </SetCategory>
        )}
      </div>

      <div className="px-4">
        <ImageAnnotationProperties 
          annotation={props.annotation} />
      </div>
        
      <div className="grow p-3 pt-0">
        <Accordion 
          type="multiple"
          defaultValue={[]}
          className="p-1">
          <AccordionItem value="relations">
            <AccordionTrigger>
              <div className="flex gap-2 items-center">
                <GitCompareArrows className="size-4" /> 
                Relations
                {arrows.length > 0 && (
                  <Badge variant="secondary">
                    {arrows.length }
                  </Badge>
                )}
              </div>
            </AccordionTrigger>

            <AccordionContent className="pt-3 pb-7 space-y-3">
              {props.canvas && arrows.map(arrow => (
                <RelationPreview
                  key={arrow.id}
                  arrow={arrow}
                  canvas={props.canvas}
                  referenceAnnotationId={props.annotation.id} />
              ))}
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="metaphor-tags">
            <AccordionTrigger>
              <div className="flex gap-2 items-center">
                <Microscope className="size-4" /> 
                Analysis
              </div>
            </AccordionTrigger>

            <AccordionContent className="pb-12">
              
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="conversation">
            <AccordionTrigger>
              <div className="flex gap-2 items-center">
                <MessagesSquare className="size-4" /> Conversation
                <Badge variant="secondary">2</Badge>
              </div>
            </AccordionTrigger>

            <AccordionContent className="pb-12">
              <Conversation />
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>

      <div className="shrink-0 p-4">
        <Button 
          variant="destructive"
          size="lg"
          className="w-full">
          <Trash2 /> Delete Annotation
        </Button>
      </div>
    </div>
  )
}