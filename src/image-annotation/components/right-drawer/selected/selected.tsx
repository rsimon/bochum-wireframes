import { GitCompareArrows, Microscope, Shapes, Tags, TextCursorInput, Trash2 } from 'lucide-react';
import { useAnnotationStore, useSelection } from '@annotorious/react';
import { TEIAnnotation } from '@recogito/react-text-annotator';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { AnnotationType } from '@/text-annotation/types';
import { setAnnotationType } from '@/text-annotation/utils';
import { useMemo } from 'react';
import { Badge } from '@/components/ui/badge';

interface SelectedAnnotationDetailsProps {

  annotation: TEIAnnotation;

}

const SelectedAnnotationDetails = (props: SelectedAnnotationDetailsProps) => {

  const linkCount = useMemo(() => 
    props.annotation.bodies.filter(b => b.purpose === 'linking').length, [props.annotation]);

  const tagCount = useMemo(() => 
    props.annotation.bodies.filter(b => b.purpose === 'tagging').length, [props.annotation]);

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
                {linkCount > 0 && (
                  <Badge variant="secondary">
                    {linkCount}
                  </Badge>
                )}
              </div>
            </AccordionTrigger>

            <AccordionContent className="pb-12">
              
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="metaphor-tags">
            <AccordionTrigger>
              <div className="flex gap-2 items-center">
                <Tags className="size-4" /> 
                Tags
                {tagCount > 0 && (
                  <Badge variant="secondary">
                    {tagCount}
                  </Badge>
                )}
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

export const Selected = () => {

  const { selected } = useSelection<TEIAnnotation>();

  return selected.length === 0 ? (
    <div className="p-4 h-full flex items-center justify-center">
      <div className="text-center text-muted-foreground">
        <TextCursorInput 
          className="h-12 w-12 mx-auto mb-4" 
          strokeWidth={1.25} />
        <p className="text-sm">Select Annotation</p>
      </div>
    </div>
  ) : (
    <SelectedAnnotationDetails
      annotation={selected[0].annotation} />
  )

}