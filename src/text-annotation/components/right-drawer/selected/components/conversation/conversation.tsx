import { ArrowRight } from 'lucide-react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { getAvatarColor } from '@/utils';
import { Comment } from './comment';

export const Conversation = () => {
  
  return (
    <div className="space-y-4 px-1.5">
      <div>
        <div className="space-y-2 border-b pb-2">
          <div className="mt-3 flex gap-1.5 text-xs items-center">
            <Avatar className="size-5">
              <AvatarFallback
                className="text-white font-medium text-[9px]"
                style={{ backgroundColor: getAvatarColor('rainersimon') }}>
                RS
              </AvatarFallback>
            </Avatar>

            <span className="font-medium">Rainer</span><span className="text-muted-foreground"> · 2 days ago</span>
          </div>

          <Comment>
            This is a test comment...
          </Comment>
        </div>

        <div className="space-y-2 border-b pb-2">
          <div className="mt-3 flex gap-1.5 text-xs items-center">
            <Avatar className="size-5">
              <AvatarFallback
                className="text-white font-medium text-[9px]"
                style={{ backgroundColor: getAvatarColor('jamiefolsom') }}>
                JF
              </AvatarFallback>
            </Avatar>

            <span className="font-medium">Me</span><span className="text-muted-foreground"> · 1 day ago</span>
          </div>

          <Comment>
            This is a very long comment. Lorem ipsum dolor sit amet, consectetur adipiscing 
            elit. Morbi nec ex eu nisi scelerisque sollicitudin eget ac sapien. Quisque 
            hendrerit, lacus non aliquam rhoncus, ligula felis vulputate libero, nec
            posuere orci urna a odio. In volutpat, augue fermentum facilisis pretium, 
            erat nisl elementum est, eu dapibus dolor libero vel urna. 
          </Comment>
        </div>
      </div>

      <div className="space-y-2 flex flex-col items-end">
        <Textarea 
          placeholder="Add a reply..." 
          className="bg-muted" />

        <Button
          size="icon"
          className="rounded-full -mr-0.5">
          <ArrowRight className="size-4" />
        </Button>
      </div>
    </div>
  )

}