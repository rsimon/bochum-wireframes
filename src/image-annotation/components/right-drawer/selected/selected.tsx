import { GitCompareArrows, Microscope, Shapes, SquareMousePointer, Trash2 } from 'lucide-react';
import { CozyCanvas } from 'cozy-iiif';
import { ImageAnnotation, useSelection } from '@annotorious/react';
import { useArrows } from '@annotorious/plugin-arrows-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { RelationPreview } from '@/image-annotation/components/shared';

interface SelectedAnnotationDetailsProps {

  annotation: ImageAnnotation;

  canvas?: CozyCanvas;

}

const SelectedAnnotationDetails = (props: SelectedAnnotationDetailsProps) => {

  const arrows = useArrows(props.annotation.id);

  return (
    <div className="grow flex flex-col">
      <div className="p-4">
        <button className="w-full rounded border border-input cursor-pointer p-4 bg-muted hover:bg-muted/60 flex items-center justify-center text-sm text-muted-foreground/50">
          <div className="flex gap-2 items-center font-medium py-4">
            <Shapes className="size-6 -rotate-12" strokeWidth={1.75}/> Add class
          </div>
        </button>
      </div>
      <div className="grow p-3">
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

            <AccordionContent className="pb-12 space-y-3">
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

interface SelectedProps {

  canvas?: CozyCanvas;

}

export const Selected = (props: SelectedProps) => {

  const { selected } = useSelection<ImageAnnotation>();

  return selected.length === 0 ? (
    <div className="p-4 h-full flex items-center justify-center">
      <div className="text-center text-muted-foreground">
        <SquareMousePointer 
          className="h-12 w-12 mx-auto mb-4" 
          strokeWidth={1.25} />
        <p className="text-sm">Select Annotation</p>
      </div>
    </div>
  ) : (
    <SelectedAnnotationDetails
      annotation={selected[0].annotation} 
      canvas={props.canvas} />
  );

}