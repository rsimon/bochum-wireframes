
import { useState } from 'react';
import { AutosuggestSearch } from './autosuggest-search';
import { Tag } from './tag';
import { Button } from '@/components/ui/button';
import { ListTree } from 'lucide-react';

export const MetaphorTags = () => {

  const [tags, setTags] = useState<string[]>([]);

  const onAddTag = (tag: string) => {
    if (tags.includes(tag)) return;
    setTags([...tags, tag]);
  }

  const onDeleteTag = (tag: string) => {
    setTags(tags.filter(t => t !== tag));
  }

  return (
    <div className="p-1">
      <div className="flex gap-1 w-full">
        <div className="grow">
          <AutosuggestSearch 
            onSelect={onAddTag} />
        </div>

        <Button
          variant="ghost"
          size="icon">
          <ListTree className="size-4" />
        </Button>
      </div>

      <ul className="flex items-center px-0.5 py-2 gap-1">
        {tags.map(tag => (
          <li key={tag}>
            <Tag value={tag} onDelete={() => onDeleteTag(tag)} />
          </li>
        ))}
      </ul>
    </div>
  )

}
