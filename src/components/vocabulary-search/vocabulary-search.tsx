import { ReactNode, useState } from 'react';
import { Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useVocabularySearch } from './use-vocabulary-search';
import { VocabularyTerm } from './dummy-vocabulary';
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

  children: ReactNode;

  onSelect(term: VocabularyTerm): void;

}

export const VocabularySearch = (props: VocabularySearchProps) => {

  const [open, setOpen] = useState(false);

  const [query, setQuery] = useState('');

  const matches = useVocabularySearch(query);

  const onSelect = (term: VocabularyTerm) => {
    props.onSelect(term);
    setOpen(false);
  }

  return (
    <Dialog 
      open={open}
      onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {props.children}
      </DialogTrigger>
      
      <DialogContent 
        className="p-0 gap-0"
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
              placeholder="Search..." 
              value={query}
              onChange={evt => setQuery(evt.target.value)} />
          </div>

          <div className="p-1.5">
            {matches.length === 0 ? (
              <div className="min-h-32 text-sm flex items-center justify-center text-muted-foreground font-light">
                No matches...
              </div>
            ) : (
              <div className="text-sm min-h-32">
                {matches.map(term => (
                  <button 
                    key={term.id}
                    className="py-1.5 px-2.5 flex gap-1 rounded w-full text-left hover:bg-muted cursor-pointer"
                    onClick={() => onSelect(term)}>
                    {term.label} 
                    {(term.altLabels || []).length > 0 && (
                      <div className="text-muted-foreground [&>span]:before:content-['_·_']">
                        {term.altLabels.map(label => (
                          <span key={label}>{label}</span>
                        ))}
                      </div>
                    )}
                  </button>
                ))}  
              </div>
            )}
          </div>
        </div>

        <DialogFooter className="px-3 py-1 border-t">
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