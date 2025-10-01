import { ReactNode } from 'react';
import { Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

interface VocabularySearchProps {

  children: ReactNode

}

export const VocabularySearch = (props: VocabularySearchProps) => {

  return (
    <Dialog>
      <DialogTrigger asChild>
        {props.children}
      </DialogTrigger>
      
      <DialogContent 
        className="p-0"
        showCloseButton={false}>
        <DialogHeader className="sr-only">
          <DialogTitle>Vocabulary Search</DialogTitle>
          <DialogDescription>
            Search the vocabulary and pick a term to add as a tag.
          </DialogDescription>
        </DialogHeader>

        <div>
          <div className="relative border-b flex items-center">
            <div className="p-3 text-muted-foreground">
              <Search className="size-4" />
            </div>

            <Input 
              className="w-full border-none shadow-none focus-visible:ring-0 pl-0" 
              placeholder="Search..." />
          </div>

          <div className="p-4">
            results...
          </div>
        </div>

        <DialogFooter className="px-3 py-1">
          <DialogClose asChild>
            <Button 
              variant="link"
              className="h-auto p-2">Cancel</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )

}