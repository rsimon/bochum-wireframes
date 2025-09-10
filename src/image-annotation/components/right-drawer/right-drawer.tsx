import { MessagesSquare, SlidersHorizontal, SquareMousePointer, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Selected } from './selected';
import { Settings } from './settings';

interface RightDrawerProps {

  tab?: RightDrawerTab;

  onStateChange(tab?: RightDrawerTab): void;

}

export type RightDrawerTab = 'selected' | 'list' | 'settings';

export const RightDrawer = (props: RightDrawerProps) => {

  return (
    <div
      className={`bg-card border-l transition-all duration-300 ${props.tab ? 'w-80' : 'w-0'} overflow-hidden`}>
      <div className="w-80 flex flex-col h-full overflow-y-auto">
        <div className="flex items-center justify-between p-4 border-b">
          <h3 className="font-semibold">Annotations</h3>
          <Button variant="ghost" size="icon" onClick={() => props.onStateChange(undefined)}>
            <X className="h-4 w-4" />
          </Button>
        </div>

        <Tabs 
          value={props.tab || 'selected'} 
          onValueChange={props.onStateChange}
          className="grow gap-0">
          <TabsList className="grid w-full grid-cols-3 rounded-none border-b sticky top-0 z-10">
            <TabsTrigger value="selected" className="flex items-center gap-2">
              <SquareMousePointer className="size-4" /> Selected
            </TabsTrigger>
            <TabsTrigger value="list" className="flex items-center gap-2">
              <MessagesSquare className="size-4" /> List
            </TabsTrigger>
            <TabsTrigger value="settings" className="flex items-center gap-2">
              <SlidersHorizontal className="size-4" /> Settings
            </TabsTrigger>
          </TabsList>

          <TabsContent value="selected" className="flex flex-col mt-0 grow">
            <Selected />
          </TabsContent>

          <TabsContent value="list" className="mt-0 grow">
            
          </TabsContent>

          <TabsContent value="settings" className="mt-0 h-full">
            <Settings />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )

}