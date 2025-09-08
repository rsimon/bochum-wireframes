import { AnnotationType } from '@/types';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';

interface TypeSelectorProps {

  type: AnnotationType;

  onChangeType(type: AnnotationType): void;

}

export const TypeSelector = (props: TypeSelectorProps) => {

  return (
    <Select 
      value={props.type}
      onValueChange={props.onChangeType}>
      <SelectTrigger className="w-full">
        <SelectValue />
      </SelectTrigger>

      <SelectContent>
        <SelectItem value="metaphor">Metaphor</SelectItem>
        <SelectItem value="mrw">Metaphor-Related Word</SelectItem>
      </SelectContent>
    </Select>
  )

}