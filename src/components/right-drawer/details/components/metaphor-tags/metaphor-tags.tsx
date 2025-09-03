
import { useMemo } from 'react';
import { ListTree } from 'lucide-react';
import { TEIAnnotation } from '@recogito/react-text-annotator';
import { Button } from '@/components/ui/button';
import { AutosuggestSearch } from './autosuggest-search';
import { Tag } from './tag';
import { createBody, useAnnotationStore } from '@annotorious/react';

interface MetaphorTagsProps {

  annotation: TEIAnnotation;

}

export const MetaphorTags = (props: MetaphorTagsProps) => {

  const store = useAnnotationStore();

  const tags = useMemo(() => {
    return props.annotation.bodies.filter(b => b.purpose === 'tagging' &&  b.value).map(b => b.value);
  }, [props.annotation]);

  const setTags = (tags: string[]) => {
    if (!store) return;

    const updated = {
      ...props.annotation,
      bodies: [
        ...props.annotation.bodies.filter(b => b.purpose !== 'tagging'),
        ...tags.map(value => createBody(props.annotation, { purpose: 'tagging', value }))
      ]
    } as TEIAnnotation;

    store.updateAnnotation(updated);
  }

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
