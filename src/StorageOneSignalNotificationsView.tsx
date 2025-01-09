import { requireNativeView } from 'expo';
import * as React from 'react';

import { StorageOneSignalNotificationsViewProps } from './StorageOneSignalNotifications.types';

const NativeView: React.ComponentType<StorageOneSignalNotificationsViewProps> =
  requireNativeView('StorageOneSignalNotifications');

export default function StorageOneSignalNotificationsView(props: StorageOneSignalNotificationsViewProps) {
  return <NativeView {...props} />;
}
