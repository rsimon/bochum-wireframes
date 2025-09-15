import { getAvatarColor } from '@/utils';
import { Avatar, AvatarFallback } from '../ui/avatar';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { Badge } from '../ui/badge';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '../ui/dropdown-menu';
import { Bell, LogOut, SlidersHorizontal } from 'lucide-react';

export const MyAccount = () => {

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar className="hover:ring-4 ring-muted-foreground/25 relativ overflow-visible">
          <AvatarFallback
            className="text-white font-medium text-xs cursor-pointer"
            style={{ backgroundColor: getAvatarColor('rainer@rainersimon.io') }}>
            RS
          </AvatarFallback>

          <Badge 
            className="absolute z-10 -top-1 -right-1 text-[9px] font-semibold rounded-full aspect-square p-1 bg-slate-800 pointer-none border border-white">
            1
          </Badge>
        </Avatar>
      </DropdownMenuTrigger>

      <DropdownMenuContent>
        <DropdownMenuLabel
          className="text-sm">
          aboutgeo
        </DropdownMenuLabel>
        <DropdownMenuItem>
          <SlidersHorizontal className="size-3.5" /> Profile Settings
        </DropdownMenuItem>

        <DropdownMenuItem>
          <div className="relative">
            <Bell className="size-3.5" /> 
            <Badge 
              className="absolute z-10 -top-2 -right-2 text-[9px] font-semibold rounded-full aspect-square p-1 bg-slate-800 pointer-none border border-white">
              1
            </Badge>
          </div> My notifications
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem>
          <LogOut className="size-3.5" /> Sign out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )

}