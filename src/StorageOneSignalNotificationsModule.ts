import { NativeModule, requireNativeModule } from 'expo';

import { StorageOneSignalNotificationsModuleEvents } from './StorageOneSignalNotifications.types';

declare class StorageOneSignalNotificationsModule extends NativeModule<StorageOneSignalNotificationsModuleEvents> {
  PI: number;
  hello(): string;
  setValueAsync(value: string): Promise<void>;
}

// This call loads the native module object from the JSI.
export default requireNativeModule<StorageOneSignalNotificationsModule>('StorageOneSignalNotifications');
