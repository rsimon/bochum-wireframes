import { useEffect } from 'react';
import { useAnnotationStore } from '@annotorious/react';
import { createStoreSynchronizer } from '@annotorious/plugin-broadcast-channel-sync';

interface BroadcastChannelSyncProps {

  channelName: string;

}

export const BroadcastChannelSync = (props: BroadcastChannelSyncProps) => {

  const store = useAnnotationStore();

  useEffect(() => {
    if (!store) return;

    const sync = createStoreSynchronizer(store, { channelName: props.channelName });
    sync.connect();
    
    return () => {
      sync.disconnect();
    }
  }, [store]);

  return null;

}