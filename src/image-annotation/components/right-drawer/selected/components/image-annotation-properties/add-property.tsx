import { useState } from 'react';
import { CirclePlus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from '@/components/ui/dialog';

interface AddProperty {

  onAddProperty(property: string): void;

}

export const AddProperty = (props: AddProperty) => {

  const [open, setOpen] = useState(false);

  const [value, setValue] = useState('');

  const onSave = () => {
    props.onAddProperty(value);
    setOpen(false);
  }

  return (
    <Dialog 
      open={open}
      onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="shadow-none text-xs rounded-full mt-2">
          <CirclePlus className="size-3.5" /> Add property 
        </Button>
      </DialogTrigger>
      
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Property</DialogTitle>
          <DialogDescription className="sr-only">
            Type a property to add it to this annotation.
          </DialogDescription>
        </DialogHeader>
        
        <div>
          <Input 
            autoFocus
            value={value}
            onChange={evt => setValue(evt.target.value)} />
        </div>

        <div className="flex justify-end gap-2">
          <Button 
            variant="outline"
            onClick={() => setOpen(false)}>
            Cancel
          </Button>

          <Button
            disabled={!value}
            onClick={onSave}>
            Ok
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )

}