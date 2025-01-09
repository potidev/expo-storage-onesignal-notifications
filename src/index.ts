// Reexport the native module. On web, it will be resolved to StorageOneSignalNotificationsModule.web.ts
// and on native platforms to StorageOneSignalNotificationsModule.ts
export { default } from './StorageOneSignalNotificationsModule';
export * from  './StorageOneSignalNotifications.types';
