import { useEffect } from 'react';
import { createStoreSynchronizer } from '@annotorious/plugin-broadcast-channel-sync';
import { useAnnotationStore } from '@annotorious/react';

export const BroadcastChannelSync = () => {

  const store = useAnnotationStore();

  useEffect(() => {
    if (!store) return;

    const sync = createStoreSynchronizer(store);
    sync.connect();
    
    return () => {
      sync.disconnect();
    }
  }, [store]);

  return null;

}