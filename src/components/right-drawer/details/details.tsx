import { TextCursorInput, Trash2 } from 'lucide-react';
import { useAnnotationStore, useAnnotator, useSelection } from '@annotorious/react';
import { RecogitoTEIAnnotator, TEIAnnotation } from '@recogito/react-text-annotator';
import { Button } from '@/components/ui/button';
import { TypeSelector } from './components/type-selector';
import { SpanTools } from './components/span-tools';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { AnnotationType } from '@/types';
import { getAnnotationType, setAnnotationType } from '@/utils';

interface SelectedAnnotationDetailsProps {

  annotation: TEIAnnotation;

}

const SelectedAnnotationDetails = (props: SelectedAnnotationDetailsProps) => {

  const store = useAnnotationStore();

  const type = getAnnotationType(props.annotation);

  const onChangeType = (type: AnnotationType) => {
    if (!store) return;
    const updated = setAnnotationType(props.annotation, type);
    store.updateAnnotation(updated);
  }

  return (
    <div className="grow flex flex-col">
      <div className="grow p-4">
        <div className="flex gap-1.5 justify-between">
          <div className="grow relative">
            <TypeSelector 
              type={type} 
              onChangeType={onChangeType} />
          </div>

          <SpanTools />
        </div>

        <Accordion type="multiple">

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