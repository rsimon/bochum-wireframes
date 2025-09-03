import { ChartNoAxesGantt, MessagesSquare, SquareMousePointer, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Details } from './details';

interface RightDrawerProps {

  open: boolean;

  onOpenChange(open: boolean): void;

}

export const RightDrawer = (props: RightDrawerProps) => {

  return (
    <div
      className={`bg-card border-l transition-all duration-300 ${props.open ? 'w-80' : 'w-0'} overflow-hidden`}>
      <div className="w-80 flex flex-col h-full overflow-y-auto">
        <div className="flex items-center justify-between p-4 border-b">
          <h3 className="font-semibold">Annotations</h3>
          <Button variant="ghost" size="icon" onClick={() => props.onOpenChange(false)}>
            <X className="h-4 w-4" />
          </Button>
        </div>

        <Tabs defaultValue="details" className="grow">
          <TabsList className="grid w-full grid-cols-3 rounded-none border-b sticky top-0 z-10">
            <TabsTrigger value="details" className="flex items-center gap-2">
              <SquareMousePointer className="size-4" /> Details
            </TabsTrigger>
            <TabsTrigger value="list" className="flex items-center gap-2">
              <MessagesSquare className="size-4" /> List
            </TabsTrigger>
            <TabsTrigger value="minimap" className="flex items-center gap-2">
              <ChartNoAxesGantt className="size-4" /> Minimap
            </TabsTrigger>
          </TabsList>

          <TabsContent value="details" className="flex flex-col mt-0 grow">
            <Details />
          </TabsContent>

          <TabsContent value="list" className="mt-0 grow">
            <ScrollArea className="h-full p-4">
              <div className="space-y-3">
                {/* annotations.map((annotation) => (
                  <Card key={annotation.id} className="cursor-pointer hover:bg-accent/50 transition-colors font-mono">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm flex items-center gap-2">
                        {annotation.type === "highlight" ? (
                          <Hash className="h-3 w-3 text-yellow-500" />
                        ) : (
                          <MessageSquare className="h-3 w-3 text-blue-500" />
                        )}
                        {annotation.type === "highlight" ? "Highlight" : "Comment"}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <p className="text-xs text-muted-foreground mb-2">"{annotation.text}"</p>
                      <p className="text-sm">{annotation.note}</p>
                    </CardContent>
                  </Card>
                )) */}
              </div>
            </ScrollArea>
          </TabsContent>

          <TabsContent value="minimap" className="mt-0 h-full">
            <div className="p-4 h-full flex items-center justify-center">
              <div className="text-muted-foreground">
                <ChartNoAxesGantt 
                  strokeWidth={1.5}
                  className="h-12 w-12 mx-auto mb-2" />
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )

}