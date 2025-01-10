import { NativeModule, requireNativeModule } from 'expo';

export type OneSignalDatabaseItem = {
  id: string;
  title: string;
  body: string;
  jsonData: string;
  timestamp: string;
}

declare class StorageOneSignalNotificationsModule extends NativeModule {
  getNotifications(): Promise<OneSignalDatabaseItem[]>;
  getNotifcationById(id: number): Promise<OneSignalDatabaseItem>;
  deleteAllNotifications(): Promise<void>;
  deleteNotificationById(id: number): Promise<void>;
}

// This call loads the native module object from the JSI.
export const OneSignalStorage = requireNativeModule<StorageOneSignalNotificationsModule>('StorageOneSignalNotificationsModule');
