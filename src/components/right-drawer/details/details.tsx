import { TextCursorInput, Trash2 } from 'lucide-react';
import { useSelection } from '@annotorious/react';
import { Button } from '@/components/ui/button';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { TypeSelector } from './components/type-selector';
import { SpanTools } from './components/span-tools';

export const Details = () => {

  const { selected } = useSelection();

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
    <div className="grow flex flex-col">
      <div className="grow p-4">
        <div>
          <TypeSelector />

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