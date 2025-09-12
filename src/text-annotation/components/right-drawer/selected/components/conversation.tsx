import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { ArrowRight } from 'lucide-react';

export const Conversation = () => {
  
  return (
    <div>
      <div className="space-y-2 flex flex-col items-end">
        <Textarea 
          placeholder="Add a reply..." 
          className="bg-muted" />

        <Button
          size="icon"
          className="rounded-full">
          <ArrowRight className="size-4" />
        </Button>
      </div>
    </div>
  )

}