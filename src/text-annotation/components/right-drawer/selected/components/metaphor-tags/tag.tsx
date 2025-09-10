import { X } from 'lucide-react';

interface TagProps {

  value: string;

  onDelete(): void;

}

export const Tag = (props: TagProps) => {

  return (
    <div className="flex gap-1 items-center text-xs bg-muted p-1 pl-1.5 rounded border">
      {props.value}
      <button onClick={props.onDelete}>
        <X className="size-3.5 mt-0.5 cursor-pointer text-muted-foreground hover:text-primary" />
      </button>
    </div>
  )

}