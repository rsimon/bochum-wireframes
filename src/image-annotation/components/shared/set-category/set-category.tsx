import { ReactNode, useState } from 'react';
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

interface AddConceptTagProps {

  children: ReactNode;

  onSetCategory(tag: string): void;

}

export const SetCategory = (props: AddConceptTagProps) => {

  const [open, setOpen] = useState(false);

  const [value, setValue] = useState('');

  const onSave = () => {
    props.onSetCategory(value);
    setOpen(false);
  }

  return (
    <Dialog 
      open={open}
      onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <div>
          {props.children}
        </div>
      </DialogTrigger>
      
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Enter Concept</DialogTitle>
          <DialogDescription className="sr-only">
            Search the vocabulary and pick a term to add as a tag.
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