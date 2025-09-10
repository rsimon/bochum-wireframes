
import { KeyboardEvent, useEffect, useState } from 'react';
import { Search } from 'lucide-react';
import { Popover, PopoverAnchor, PopoverContent } from '@/components/ui/popover';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

const DUMMY_SUGGESTIONS = ['Place', 'Person', 'Event'];

interface AutosuggestSearchProps {

  onSelect(tag: string): void;

}

export const AutosuggestSearch = (props: AutosuggestSearchProps) => {

  const [query, setQuery] = useState('');

  const [suggestions, setSuggestions] = useState<string[]>([]);

  const [selectedIndex, setSelectedIndex] = useState(-1);

  useEffect(() => {
    if (query) {
      setTimeout(() => setSuggestions(DUMMY_SUGGESTIONS), 200);
    } else {
      setSuggestions([]);
    }
  }, [query]);

  const onSelect = (value: string) => {
    setQuery('');
    setSuggestions([]);
    setSelectedIndex(-1);
    props.onSelect(value);
  }

  const onKeyDown = (evt: KeyboardEvent) => {
    if (suggestions.length === 0) return;

    if (evt.key === 'ArrowDown') {
      setSelectedIndex(current => Math.min(current + 1, suggestions.length - 1));
    } else if (evt.key === 'ArrowUp') {
      setSelectedIndex(current => Math.max(current - 1, 0));
    } else if (evt.key === 'Enter') {
      const selected = suggestions[selectedIndex];
      if (selected)
        onSelect(selected);
    }
  }

  return (
    <Popover open={suggestions.length > 0}>
      <PopoverAnchor>
        <div className="relative">
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)} 
            className="pl-8" 
            onKeyDown={onKeyDown}/>

          <Search className="size-5 absolute top-2 left-2 text-muted-foreground/50" />
        </div>
      </PopoverAnchor>

      <PopoverContent
        onOpenAutoFocus={(evt) => evt.preventDefault()}
        className="p-1.5 text-sm">
        <ul>
          {suggestions.map((result, index) => (
            <li 
              key={`${result}-${index}`}
              className={cn('py-1.5 px-2 rounded', selectedIndex === index ? 'bg-muted' : undefined)}
              onMouseEnter={() => setSelectedIndex(index)}>
              <button 
                className="w-full text-left"
                onClick={() => onSelect(result)}>
                {result}
              </button>
            </li>
          ))}
        </ul>
      </PopoverContent>
    </Popover>
  )

}
