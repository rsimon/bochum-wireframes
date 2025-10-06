import { Pencil } from 'lucide-react';
import { TEIAnnotation } from '@recogito/react-text-annotator';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { getMRWType, getQuote } from '@/text-annotation/utils';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useMemo } from 'react';

interface LinkedWordItemProps {

  annotation: TEIAnnotation;

  checked: boolean;

  onCheckedChange(checked: boolean): void;

  onSelectWord(): void;

}

export const LinkedWordItem = (props: LinkedWordItemProps) => {

  const mrwType = useMemo(() => getMRWType(props.annotation), [props.annotation]);

  return (
    <div 
      className="flex items-center gap-3 font-serif italic">
      <Checkbox 
        checked={props.checked}
        onCheckedChange={props.onCheckedChange}
        id={props.annotation.id} />

      <div className="flex items-center gap-1">
        <Label 
          htmlFor={props.annotation.id}
          className="whitespace-nowrap overflow-visible">
          <span>{getQuote(props.annotation)}</span>
        </Label>

        {mrwType && (
          <Badge 
            variant="secondary"
            className="not-italic font-sans font-light">{mrwType}</Badge>
        )}

        <Button
          variant="ghost"
          size="icon"
          className="size-7"
          onClick={props.onSelectWord}>
          <Pencil className="size-3" />
        </Button>
      </div>
    </div>
  )

}