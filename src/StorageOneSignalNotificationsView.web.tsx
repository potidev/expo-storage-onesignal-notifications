import * as React from 'react';

import { StorageOneSignalNotificationsViewProps } from './StorageOneSignalNotifications.types';

export default function StorageOneSignalNotificationsView(props: StorageOneSignalNotificationsViewProps) {
  return (
    <div>
      <iframe
        style={{ flex: 1 }}
        src={props.url}
        onLoad={() => props.onLoad({ nativeEvent: { url: props.url } })}
      />
    </div>
  );
}
