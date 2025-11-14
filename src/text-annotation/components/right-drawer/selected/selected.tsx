import { useEffect, useMemo, useState } from 'react';
import { GitCompareArrows, MessagesSquare, Microscope, Tags, TextCursorInput, Trash2 } from 'lucide-react';
import { useAnnotationStore, useAnnotator, useSelection } from '@annotorious/react';
import { RecogitoTextAnnotator, TEIAnnotation } from '@recogito/react-text-annotator';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Conversation } from '@/components/conversation';
import { AnnotationType } from '@/text-annotation/types';
import { getAnnotationType, setAnnotationType } from '@/text-annotation/utils';
import { TypeSelector } from './components/type-selector';
import { SpanTools } from './components/span-tools';
import { MetaphorLinkedWords } from './components/metaphor-linked-words';
import { MetaphorAnalysis } from './components/metaphor-analysis';
import { MetaphorPreview } from './components/metaphor-preview';
import { MetaphorTags } from './components/metaphor-tags';
import { WordTags } from './components/word-tags';
import { WordUplink } from './components/word-uplink';

interface SelectedAnnotationDetailsProps {

  annotation: TEIAnnotation;

}

const SelectedAnnotationDetails = (props: SelectedAnnotationDetailsProps) => {

  const store = useAnnotationStore();

  const type = getAnnotationType(props.annotation);

  const anno = useAnnotator<RecogitoTextAnnotator>();

  const [annotatingMode, setAnnotingMode] = useState('CREATE_NEW');

  useEffect(() => {
    if (!anno) return;
    anno.setAnnotatingMode(annotatingMode as 'CREATE_NEW' | 'ADD_TO_CURRENT');
  }, [anno, annotatingMode]);

  useEffect(() => {
    // Reset the annotatingMode each time an annotation is created
    const onCreate = () => setAnnotingMode('CREATE_NEW');
    anno.on('createAnnotation', onCreate);

    return () => {
      anno.off('createAnnotation', onCreate);
    }
  }, []);

  const linked = useMemo(() => 
    props.annotation.bodies.filter(b => b.purpose === 'linking' && b.value).map(b => b.value)
  , [props.annotation]);

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
        {type === 'mrw' && (
          <WordUplink annotation={props.annotation} />
        )}

        <div className="flex gap-1.5 justify-between">
          <div className="grow relative">
            <TypeSelector 
              type={type} 
              onChangeType={onChangeType} />
          </div>

          <SpanTools 
            extendEnabled={annotatingMode === 'ADD_TO_CURRENT'}
            onSetExtendEnabled={enabled => setAnnotingMode(enabled ? 'ADD_TO_CURRENT' : 'CREATE_NEW')} />
        </div>

        <div>
          <MetaphorPreview 
            annotation={props.annotation} 
            linked={linked} />
        </div>

        {type === 'mrw' && (
          <WordTags annotation={props.annotation} />
        )}

        <Accordion 
          type="multiple"
          defaultValue={['metaphor-linked-words']}
          className="p-1">
          {type === 'metaphor' && (
            <AccordionItem value="metaphor-linked-words">
              <AccordionTrigger>
                <div className="flex gap-2 items-center">
                  <GitCompareArrows className="size-4" /> 
                  Linked Words
                  {linked.length > 0 && (
                    <Badge variant="secondary">
                      {linked.length}
                    </Badge>
                  )}
                </div>
              </AccordionTrigger>

              <AccordionContent className="pb-12">
                <MetaphorLinkedWords 
                  annotation={props.annotation} 
                  linked={linked} />
              </AccordionContent>
            </AccordionItem>
          )}

          {type === 'metaphor' && (
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
          )}
          
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