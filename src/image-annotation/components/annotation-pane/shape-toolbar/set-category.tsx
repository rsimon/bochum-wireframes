import { useState } from 'react';
import { Tag } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
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
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="relative">
                <Tag className="size-3.5" />
              </Button>
            </TooltipTrigger>

            <TooltipContent>
              <p>Add concept tag</p>
            </TooltipContent>
          </Tooltip>
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