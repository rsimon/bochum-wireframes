import { useState } from 'react';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export const AnnotationStyle = () => {

  const [coding, setCoding] = useState<'by-type' | 'by-tag'>('by-type');

  return (
    <div>
      <Select
        value={coding}
        onValueChange={coding => setCoding(coding as 'by-type' | 'by-tag')}>
        <SelectTrigger className="w-full mb-4">
          <SelectValue />
        </SelectTrigger>

        <SelectContent>
          <SelectItem value="by-type">
            By annotation type
          </SelectItem>

          <SelectItem value="by-tag">
            By first tag
          </SelectItem>
        </SelectContent>
      </Select>

      {coding === 'by-type' ? (
        <div className="p-1 space-y-3">
          <div className="flex gap-2.5">
            <div className="size-5 border border-black/10 border-b-2  rounded-t border-b-black" /> Metaphor
          </div>

          <div className="flex gap-2.5">
            <div className="bg-green-500/60 size-5 rounded" /> Word
          </div>
        </div>
      ) : coding === 'by-tag' ? (
        <div className="p-1 space-y-3">
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
      ) : null}
    </div>
  )

}