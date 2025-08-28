import { List, Map, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';

interface LeftDrawerProps {

  open: boolean;

  onOpenChange(open: boolean): void;

}

export const LeftDrawer = (props: LeftDrawerProps) => {

  return (
    <div
      className={`bg-card border-r transition-all duration-300 ${props.open ? 'w-80' : 'w-0'} overflow-hidden`}>
      <div className="w-80 h-full">
        <div className="flex items-center justify-between p-4 border-b">
          <h3 className="font-semibold">Navigation</h3>
          <Button variant="ghost" size="icon" onClick={() => props.onOpenChange(false)}>
            <X className="h-4 w-4" />
          </Button>
        </div>

        <Tabs defaultValue="toc" className="h-full">
          <TabsList className="grid w-full grid-cols-2 rounded-none border-b">
            <TabsTrigger value="toc" className="flex items-center gap-2">
              <List className="h-4 w-4" />
              Contents
            </TabsTrigger>
            <TabsTrigger value="minimap" className="flex items-center gap-2">
              <Map className="h-4 w-4" />
              Mini-map
            </TabsTrigger>
          </TabsList>

          <TabsContent value="toc" className="mt-0 h-full">
            <ScrollArea className="h-full p-4">
              <div className="space-y-2">
                
              </div>
            </ScrollArea>
          </TabsContent>

          <TabsContent value="minimap" className="mt-0 h-full">
            <div className="p-4 h-full flex items-center justify-center">
              <div className="text-center text-muted-foreground">
                <Map className="h-12 w-12 mx-auto mb-2" />
                <p className="text-sm">Mini-map view</p>
                <p className="text-xs">To be implemented</p>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )

}