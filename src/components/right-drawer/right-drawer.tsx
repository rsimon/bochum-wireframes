import { FileText, MessageSquare, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';

interface RightDrawerProps {

  open: boolean;

  onOpenChange(open: boolean): void;

}

export const RightDrawer = (props: RightDrawerProps) => {

  return (
    <div
      className={`bg-card border-l transition-all duration-300 ${props.open ? 'w-80' : 'w-0'} overflow-hidden`}>
      <div className="w-80 h-full">
        <div className="flex items-center justify-between p-4 border-b">
          <h3 className="font-semibold">Annotations</h3>
          <Button variant="ghost" size="icon" onClick={() => props.onOpenChange(false)}>
            <X className="h-4 w-4" />
          </Button>
        </div>

        <Tabs defaultValue="details" className="h-full">
          <TabsList className="grid w-full grid-cols-2 rounded-none border-b">
            <TabsTrigger value="details" className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              Details
            </TabsTrigger>
            <TabsTrigger value="list" className="flex items-center gap-2">
              <MessageSquare className="h-4 w-4" />
              Annotations
            </TabsTrigger>
          </TabsList>

          <TabsContent value="details" className="mt-0 h-full">
            <div className="p-4 h-full flex items-center justify-center">
              <div className="text-center text-muted-foreground">
                <FileText className="h-12 w-12 mx-auto mb-2" />
                <p className="text-sm">Annotation details</p>
                <p className="text-xs">Select an annotation to view details</p>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="list" className="mt-0 h-full">
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
        </Tabs>
      </div>
    </div>
  )

}