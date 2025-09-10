import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { getAvatarColor } from '@/utils';

export const AvatarStack = () => {

  return (
    <div className="*:data-[slot=avatar]:ring-background flex -space-x-1 *:data-[slot=avatar]:ring-2">
      <Avatar>
        <AvatarFallback
          className="text-white font-medium text-xs"
          style={{ backgroundColor: getAvatarColor('jamiefolsom') }}>
          JF
        </AvatarFallback>
      </Avatar>
      <Avatar>
        <AvatarFallback
          className="text-white font-medium text-xs"
          style={{ backgroundColor: getAvatarColor('rainersimon') }}>
          RS
        </AvatarFallback>
      </Avatar>
      <Avatar>
        <AvatarFallback
          className="text-white font-medium text-xs"
          style={{ backgroundColor: getAvatarColor('lorinjameson') }}>
          LJ
        </AvatarFallback>
      </Avatar>
    </div>
  )

}