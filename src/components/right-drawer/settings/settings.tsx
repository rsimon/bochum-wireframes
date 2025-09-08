import { ListFilter, Palette } from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { AnnotationStyle } from './components/annotation-style';
import { Filters } from './components/filters';

export const Settings = () => {

  return (
    <Accordion
      type="multiple"
      defaultValue={[]}>
      <AccordionItem value="color">
        <AccordionTrigger className="p-3">
          <div className="flex gap-2 items-center">
            <Palette className="size-4" /> Annotation Style
          </div>
        </AccordionTrigger>

        <AccordionContent className="p-4 pb-6">
          <AnnotationStyle />
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="filters">
        <AccordionTrigger className="p-3">
          <div className="flex gap-2 items-center">
            <ListFilter className="size-4" /> Filter
          </div>
        </AccordionTrigger>

        <AccordionContent>
          <Filters />
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  )

}