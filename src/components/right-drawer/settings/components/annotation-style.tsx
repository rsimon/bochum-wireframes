import { useState } from 'react';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';

export const AnnotationStyle = () => {

  const [coding, setCoding] = useState<'by-type' | 'by-tag'>('by-type');

  return (
    <RadioGroup 
      className="space-y-1"
      value={coding}
      onValueChange={value => setCoding(value as 'by-type' | 'by-tag')}>
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="by-type" id="by-type" />
        <Label htmlFor="by-type" className="font-normal">By annotation type</Label>
      </div>

      {coding === 'by-type' && (
        <div className="p-2 border text-muted-foreground space-y-2 rounded">
          <div className="flex gap-2.5">
            <div className="size-5 border border-black/10 border-b-2  rounded-t border-b-black" /> Metaphor
          </div>

          <div className="flex gap-2.5">
            <div className="bg-green-500/60 size-5 rounded" /> Word
          </div>
        </div>
      )}

      <div className="flex items-center space-x-2">
        <RadioGroupItem value="by-tag" id="by-tag" />
        <Label htmlFor="by-tag" className="font-normal">By first tag</Label>
      </div>

      {coding === 'by-tag' && (
        <div className="p-2 border text-muted-foreground space-y-2 rounded">
          <div className="flex gap-2.5">
            <div className="bg-teal-600 size-5 rounded" /> Place
          </div>

          <div className="flex gap-2.5">
            <div className="bg-amber-500 size-5 rounded" /> Person
          </div>

          <div className="flex gap-2.5">
            <div className="bg-fuchsia-500 size-5 rounded" /> Event
          </div>
        </div>
      )}
    </RadioGroup>
  )

}