import { Tags, Users } from 'lucide-react';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Toggle } from '@/components/ui/toggle';

export const Filters = () => {

  return (
    <div className="p-4 space-y-8">
      <div className="flex gap-3 items-center">
        <Switch id="hide-all" />
        <Label htmlFor="hide-all">
          Hide all annotations
        </Label>
      </div>

      <div className="space-y-2">
        <h3 className="flex gap-2">
          <Users className="size-4" /> Users
        </h3>

        <div className="flex gap-2">
          {['aboutgeo', "Rainer"].map(t => (
            <Toggle variant="outline">{t}</Toggle>
          ))}
        </div>
      </div>

      <div className="space-y-2">
        <h3 className="flex gap-2">
          <Tags className="size-4" /> Tags
        </h3>

        <div className="flex gap-2">
          {['Place', 'Person', 'Event'].map(t => (
            <Toggle variant="outline">{t}</Toggle>
          ))}
        </div>
      </div>
    </div>
  )
  
}