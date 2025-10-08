import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card';
import { cn } from '@/lib/utils';
import { CornerRightUp, Share2 } from 'lucide-react';

interface StatementLink {

  prefLabel: string;

  parentPrefLabel: string;

}

interface StatementProps {

  source: string;

  sourceLinks: StatementLink[];

  target: string;

  targetLinks: StatementLink[];

}

const COLORS = ['bg-purple-500', 'bg-orange-500', 'bg-emerald-500', 'bg-sky-400']

export const Statement = (props: StatementProps) => {

  return (
    <Card className="bg-white shadow-xs rounded-full py-2 px-2.5">
      <CardContent className="p-0 flex gap-3 justify-between items-center">
        <div className="flex gap-1.5 items-center">
          {props.target}
          {props.targetLinks.length > 0 && (
            <HoverCard openDelay={100}>
              <HoverCardTrigger>
                <Badge 
                  variant="outline"
                  className="rounded-full text-muted-foreground/80 aspect-square ring-offset-1 ring-neutral-300 hover:ring-2 pl-[5px] pr-[6px]">
                  <Share2 />
                </Badge>
              </HoverCardTrigger>

              <HoverCardContent 
                side="top" 
                sideOffset={6}
                className="py-2 px-3 space-y-1 w-auto min-w-20">
                {props.targetLinks.map((link, idx) => ( 
                  <div 
                    key={link.prefLabel}
                    className="text-sm flex gap-2 items-center">
                    <div className={cn('size-2 rounded-full', COLORS[idx % COLORS.length])}/> 
                    
                    <div className="flex gap-1.5 items-center cursor-pointer">
                      <span className="hover:underline">{link.prefLabel}</span>
                      <div className="flex items-baseline gap-0.5 text-muted-foreground text-xs">
                        <CornerRightUp className="size-3 translate-y-[1px]" /> 
                        <span className="hover:underline">{link.parentPrefLabel}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </HoverCardContent>
            </HoverCard>
          )}
        </div>

        {/*
        <div className="grow relative self-stretch mb-0.5">
          <div className="absolute w-full left-0 top-1/2 h-[1px] border-dashed border-t border-gray-400" />
          <div className="absolute -right-1 flex items-center h-full">
            <div className="border-t-4 translate-y-[0.5px] border-t-transparent border-b-4 border-b-transparent border-l-8 border-l-gray-400" />
          </div>
        </div>
        */}

        <div className="grow relative self-stretch mb-0.5">
          <div className="absolute w-full left-0 top-1/2 h-[1px] border-dashed border-t border-gray-400" />
          <div className="absolute -left-1 flex items-center h-full">
            <div className="border-t-4 translate-y-[0.5px] border-t-transparent border-b-4 border-b-transparent border-r-8 border-r-gray-400" />
          </div>
        </div>

        <div className="flex gap-1.5 items-center">
          {props.source}
          {props.sourceLinks.length > 0 ? (
            <HoverCard openDelay={100}>
              <HoverCardTrigger>
                <Badge 
                  variant="outline"
                  className="rounded-full text-muted-foreground/80 aspect-square ring-offset-1 ring-neutral-300 hover:ring-2 pl-[5px] pr-[6px]">
                  <Share2 />
                </Badge>
              </HoverCardTrigger>

              <HoverCardContent 
                side="top" 
                sideOffset={10}
                className="py-2 px-3 space-y-1 w-auto min-w-20">
                {props.sourceLinks.map((link, idx) => (
                  <div 
                    key={link.prefLabel}
                    className="text-sm flex gap-2 items-center">
                    <div className={cn('size-2 rounded-full', COLORS[(idx + props.sourceLinks.length) % COLORS.length])}/> 
                    
                    <div className="flex gap-1.5 items-center cursor-pointer">
                      <span className="hover:underline">{link.prefLabel}</span>
                      <div className="flex items-baseline gap-0.5 text-muted-foreground text-xs">
                        <CornerRightUp className="size-3 translate-y-[1px]" /> 
                        <span className="hover:underline">{link.parentPrefLabel}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </HoverCardContent>
            </HoverCard>
          ) : ( <div className="w-0.5" /> )}
        </div>
      </CardContent>
    </Card>
  )

}