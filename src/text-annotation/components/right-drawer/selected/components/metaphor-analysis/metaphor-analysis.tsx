import { Share2 } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card';

interface MetaphorAnalysisProps {

}

export const MetaphorAnalysis = (props: MetaphorAnalysisProps) => {

  return (
    <div className="space-y-2">
      <Card className="bg-white shadow-xs rounded-full py-2 px-2.5">
        <CardContent className="p-0 flex gap-3 justify-between items-center">
          <div className="flex gap-1">
            Herr
            <HoverCard openDelay={100}>
              <HoverCardTrigger>
                <Badge 
                  className="rounded-full ring-offset-1 ring-neutral-300 hover:ring-2">
                  <Share2 />1
                </Badge>
              </HoverCardTrigger>

              <HoverCardContent side="top" className="py-2 px-3 space-y-1">
                <div className="text-sm flex gap-2 items-center">
                  <div className="size-2 bg-purple-500 rounded-full" /> 
                  
                  <div className="flex gap-1 items-center hover:underline cursor-pointer">
                    God <span className="text-muted-foreground"> · Supreme God · Deity</span>
                  </div>
                </div>
              </HoverCardContent>
            </HoverCard>
          </div>

          <div className="grow relative self-stretch mb-0.5">
            <div className="absolute w-full left-0 top-1/2 h-[1px] border-dashed border-t border-gray-400" />
            <div className="absolute -right-1 flex items-center h-full">
              <div className="border-t-[5px] border-t-transparent border-b-[4.5px] border-b-transparent border-l-[10px] border-l-gray-400" />
            </div>
          </div>

          <div className="flex gap-1">
            Hirte
            <HoverCard openDelay={100}>
              <HoverCardTrigger>
                <Badge className="rounded-full ring-offset-1 ring-neutral-300 hover:ring-2">
                  <Share2 />3
                </Badge>
              </HoverCardTrigger>

              <HoverCardContent side="top" className="py-2 px-3 space-y-1">
                <div className="text-sm flex gap-2 items-center">
                  <div className="size-2 bg-orange-500 rounded-full" /> 
                  
                  <div className="flex gap-1 items-center hover:underline cursor-pointer">
                    Animals <span className="text-muted-foreground"> · Fauna</span>
                  </div>
                </div>

                <div className="text-sm flex gap-2 items-center">
                  <div className="size-2 bg-emerald-500 rounded-full" /> 
                  
                  <div className="flex whitespace-nowrap gap-1 items-center hover:underline cursor-pointer">
                    Husbandry <span className="text-muted-foreground"> · Animal Husbandry</span>
                  </div>
                </div>

                <div className="text-sm flex gap-2 items-center">
                  <div className="size-2 bg-sky-400 rounded-full" /> 
                  
                  <div className="flex whitespace-nowrap gap-1 items-center hover:underline cursor-pointer">
                    Profession <span className="text-muted-foreground"> · Occupation</span>
                  </div>
                </div>
              </HoverCardContent>
            </HoverCard>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-white shadow-xs rounded-full py-2 px-2.5">
        <CardContent className="p-0 flex gap-3 justify-between items-center">
          <div className="flex gap-1">
            Gläubige 
          </div>

          <div className="grow relative self-stretch mb-0.5">
            <div className="absolute w-full left-0 top-1/2 h-[1px] border-dashed border-t border-gray-400" />
            <div className="absolute -right-1 flex items-center h-full">
              <div className="border-t-[5px] border-t-transparent border-b-[4.5px] border-b-transparent border-l-[10px] border-l-gray-400" />
            </div>
          </div>

          <div className="flex gap-1">
            Schaf
            <HoverCard openDelay={100}>
              <HoverCardTrigger>
                <Badge className="rounded-full ring-offset-1 ring-neutral-300 hover:ring-2">
                  <Share2 />2
                </Badge>
              </HoverCardTrigger>

              <HoverCardContent side="top" className="py-2 px-3 space-y-1">
                <div className="text-sm flex gap-2 items-center">
                  <div className="size-2 bg-orange-500 rounded-full" /> 
                  
                  <div className="flex gap-1 items-center hover:underline cursor-pointer">
                    Animals <span className="text-muted-foreground"> · Fauna</span>
                  </div>
                </div>

                <div className="text-sm flex gap-2 items-center">
                  <div className="size-2 bg-emerald-500 rounded-full" /> 
                  
                  <div className="flex whitespace-nowrap gap-1 items-center hover:underline cursor-pointer">
                    Husbandry <span className="text-muted-foreground"> · Animal Husbandry</span>
                  </div>
                </div>
              </HoverCardContent>
            </HoverCard>
          </div>
        </CardContent>
      </Card>
    </div>
  );

}