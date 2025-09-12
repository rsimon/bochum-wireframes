import { useState } from 'react';
import { HatGlasses, Users } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger } from '@/components/ui/select';
import { cn } from '@/lib/utils';

export const PrivacySelector = () => {

  const [value, setValue] = useState<'public' | 'private'>('public');

  return (
    <Select 
      value={value}
      onValueChange={v => setValue(v as 'public' | 'private')}>
      <SelectTrigger 
        className={cn(
          'border-none shadow-none hover:bg-muted cursor-pointer pl-2.5 pr-2',
          value === 'private' && 'bg-black hover:bg-black/80 text-white [&_svg]:text-white!'
        )}>
        <div className="text-xs flex gap-2">
          {value === 'private' ? (
            <><HatGlasses className="size-4" /> Private</>
          ) : (
            <><Users className="size-4" /> Public</>
          )}
        </div>
      </SelectTrigger>

      <SelectContent
        align="start"
        className="p-1 w-xs">
        <SelectItem value="private" className="relative [&>span]:top-2 [&>span]:right-2">
          <div className="text-xs space-y-1">
            <h2 className="flex gap-2 items-center font-semibold">
              <HatGlasses className="size-4" /> Private
            </h2>

            <p className="text-muted-foreground leading-relaxed">
              Annotations you create in Private mode will be visible
              to <strong>no-one except you</strong>.
            </p>
          </div>
        </SelectItem>

        <SelectItem value="public" className="relative [&>span]:top-3.5 [&>span]:right-2">
          <div className="text-xs space-y-1 mt-2">
            <h2 className="flex gap-2 items-center font-semibold">
              <Users className="size-4" /> Public
            </h2>
            
            <p className="text-muted-foreground text-xs leading-relaxed">
              Public annotations are visible to anyone with access to this document. 
              This may include <strong>invited users or the general public</strong>.
            </p>
          </div>
        </SelectItem>
      </SelectContent>
    </Select>
  )

}