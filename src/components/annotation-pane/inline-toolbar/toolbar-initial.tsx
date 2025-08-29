import { useEffect } from 'react';
import { createBody, useAnnotator } from '@annotorious/react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Toggle } from '@/components/ui/toggle';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Ellipsis, GitCompareArrows, Replace, ReplaceAll, Trash2 } from 'lucide-react';
import { AnnotationType } from '@/types';
import type { 
  RecogitoTEIAnnotator, 
  TEIAnnotation, 
  TextAnnotation, 
  TextAnnotationPopupContentProps 
} from '@recogito/react-text-annotator';

interface ToolbarInitialProps extends TextAnnotationPopupContentProps {

  onClickAdvanced(): void;

}

// Trivial heuristic for "suggesting" initial annotation type
const getSuggestedType = (annotation: TextAnnotation): AnnotationType => {
  const quote = annotation.target.selector.map(s => s.quote).join(' ');
  return quote.includes(' ') ? 'metaphor' : 'mrw';
}

export const ToolbarInitial = (props: ToolbarInitialProps) => {

  const anno = useAnnotator<RecogitoTEIAnnotator>();

  const currentType = (props.annotation.bodies || []).find(b => b.purpose === 'classifying')?.value;

  const suggestedType = currentType ? null : getSuggestedType(props.annotation);

  useEffect(() => {
    if (!anno || !suggestedType) return;

    // Apply the suggested type if the annotation doesn't yet have one
    const updated: TEIAnnotation = {
      ...(props.annotation as TEIAnnotation),
      bodies: [
        ...(props.annotation.bodies || []).filter(b => b.purpose !== 'classifying'),
        createBody(props.annotation, {
          purpose: 'classifying',
          value: suggestedType
        })
      ]
    }

    anno.state.store.updateAnnotation(updated);
  }, [anno, suggestedType, props.annotation]);

  const onToggleType = (type: AnnotationType) => (pressed: boolean) => {
    if (!anno) return;

    // No-op
    if (currentType === type && pressed) return;

    // Should never happen
    if (currentType !== type && !pressed) return;
    
    if (currentType === type) {
      // Remove type
      const next: TEIAnnotation = {
        ...(props.annotation as TEIAnnotation),
        bodies: (props.annotation.bodies || []).filter(b => b.purpose !== 'classifying')
      }

      anno.state.store.updateAnnotation(next);
    } else if (pressed) {
      // Switch type
      const body = createBody(props.annotation, {
        purpose: 'classifying',
        value: type
      });

      const next: TEIAnnotation = {
        ...(props.annotation as TEIAnnotation),
        bodies: [
          ...(props.annotation.bodies || []).filter(b => b.purpose !== 'classifying'),
          body
        ]
      }

      anno.state.store.updateAnnotation(next);
    }
  }

  const onDelete = () => {
    anno.state.store.deleteAnnotation(props.annotation.id);
    window.getSelection().empty();
  }

  return (
    <TooltipProvider>
      <div 
        className="flex items-center gap-1.5"
        onFocusCapture={evt => evt.stopPropagation()}>
        <Tooltip>
          <TooltipTrigger asChild>
            {/** https://github.com/shadcn-ui/ui/issues/1988 **/}
            <div>
              <Toggle
                pressed={currentType === 'metaphor'}
                onPressedChange={onToggleType('metaphor')}>
                <div className="text-xs h-5 flex items-center justify-center underline underline-offset-2 mb-[1px]">
                  Metaphor
                </div>
              </Toggle>
            </div>
          </TooltipTrigger>

          <TooltipContent>
            <p>Mark as Metaphor</p>
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <div>
              <Toggle
                pressed={currentType === 'mrw'}
                onPressedChange={onToggleType('mrw')}>
                <div className="text-xs rounded flex items-center justify-center tracking-wide">
                  Word
                </div>
              </Toggle>
            </div>
          </TooltipTrigger>

          <TooltipContent>
            <p>Mark as Metaphor-Related Word</p>
          </TooltipContent>
        </Tooltip>

        <Separator 
          orientation="vertical" 
          className="min-h-4" />

        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="icon">
              <Replace className="size-3.5" />
            </Button>
          </TooltipTrigger>

          <TooltipContent>
            <p>Reselect & replace span</p>
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="icon">
              <ReplaceAll className="size-3.5" />
            </Button>
          </TooltipTrigger>

          <TooltipContent>
            <p>Add span</p>
          </TooltipContent>
        </Tooltip>

        <Button
          disabled
          variant="ghost"
          size="icon">
          <GitCompareArrows className="size-3.5" />
        </Button>

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
    </TooltipProvider>
  )

}