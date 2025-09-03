import { GitCompareArrows, Microscope, Tags, TextCursorInput, Trash2 } from 'lucide-react';
import { useAnnotationStore, useSelection } from '@annotorious/react';
import { TEIAnnotation } from '@recogito/react-text-annotator';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { AnnotationType } from '@/types';
import { getAnnotationType, setAnnotationType } from '@/utils';
import { TypeSelector } from './components/type-selector';
import { SpanTools } from './components/span-tools';
import { MetaphorLinkedWords } from './components/metaphor-linked-words';
import { MetaphorAnalysis } from './components/metaphor-analysis';
import { MetaphorPreview } from './components/metaphor-preview';
import { MetaphorTags } from './components/metaphor-tags';
import { useMemo } from 'react';
import { Badge } from '@/components/ui/badge';

interface SelectedAnnotationDetailsProps {

  annotation: TEIAnnotation;

}

const SelectedAnnotationDetails = (props: SelectedAnnotationDetailsProps) => {

  const store = useAnnotationStore();

  const type = getAnnotationType(props.annotation);

  const tagCount = useMemo(() => 
    props.annotation.bodies.filter(b => b.purpose === 'tagging').length, [props.annotation]);

  const onChangeType = (type: AnnotationType) => {
    if (!store) return;
    const updated = setAnnotationType(props.annotation, type);
    store.updateAnnotation(updated);
  }

  return (
    <div className="grow flex flex-col">
      <div className="grow p-3">
        <div className="flex gap-1.5 justify-between">
          <div className="grow relative">
            <TypeSelector 
              type={type} 
              onChangeType={onChangeType} />
          </div>

          <SpanTools />
        </div>

        <div>
          <MetaphorPreview 
            annotation={props.annotation} />
        </div>

        <Accordion 
          type="multiple"
          defaultValue={['metaphor-linked-words']}
          className="p-1">
          <AccordionItem value="metaphor-linked-words">
            <AccordionTrigger>
              <div className="flex gap-2 items-center">
                <GitCompareArrows className="size-4" /> Linked Words
              </div>
            </AccordionTrigger>

            <AccordionContent className="pb-12">
              <MetaphorLinkedWords annotation={props.annotation} />
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
              <MetaphorTags 
                annotation={props.annotation} />
            </AccordionContent>
          </AccordionItem>
          
          {type === 'metaphor' && (
            <AccordionItem value="metaphor-analysis">
              <AccordionTrigger>
                <div className="flex gap-2 items-center">
                  <Microscope className="size-4" /> Analysis
                </div>
              </AccordionTrigger>

              <AccordionContent className="pb-12">
                <MetaphorAnalysis />
              </AccordionContent>
            </AccordionItem>
          )}
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

export const Details = () => {

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