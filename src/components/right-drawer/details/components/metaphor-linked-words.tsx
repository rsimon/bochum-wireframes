import { useMemo, useState } from 'react';
import { TEIAnnotation } from '@recogito/react-text-annotator';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { useIntersectingAnnotations } from '../hooks';
import { getQuote } from '@/utils';
import { CheckedState } from '@radix-ui/react-checkbox';

interface MetaphorLinkedWordsProps {

  annotation: TEIAnnotation;

}

export const MetaphorLinkedWords = (props: MetaphorLinkedWordsProps) => {

  const { getIntersecting } = useIntersectingAnnotations();

  const intersecting = useMemo(() => getIntersecting(props.annotation), [props.annotation]);

  const [checked, setChecked] = useState<string[]>([]);

  const onCheckedChange = (annotationId: string, checked: CheckedState) => setChecked(current => {
    const filtered = current.filter(id => id !== annotationId);
    return checked ? [...filtered, annotationId] : filtered;
  })

  const onToggleAll = () => {
    if (checked.length === intersecting.length)
      setChecked([])
    else 
      setChecked(intersecting.map(a => a.id));
  }

  return (
    <div className="space-y-2.5 py-2 px-0.5">
      <div 
        className="flex items-center gap-3 font-light border-b pb-2">
        <Checkbox 
          checked={checked.length === 0 ? false : checked.length === intersecting.length ? true : 'indeterminate'}
          onCheckedChange={onToggleAll}
          id="all" />
        <Label htmlFor="all">All</Label>
      </div>

      {intersecting.map(annotation => (
        <div 
          key={annotation.id}
          className="flex items-center gap-3 font-serif italic overflow-hidden">
          <Checkbox 
            checked={checked.includes(annotation.id)}
            onCheckedChange={checked => onCheckedChange(annotation.id, checked)}
            id={annotation.id} />

          <Label 
            htmlFor={annotation.id}
            className="whitespace-nowrap overflow-hidden">
            <span className="truncate">{getQuote(annotation)}</span>
          </Label>
        </div>
      ))}
    </div>
  )

}