// Reexport the native module. On web, it will be resolved to StorageOneSignalNotificationsModule.web.ts
// and on native platforms to StorageOneSignalNotificationsModule.ts
export { default } from './StorageOneSignalNotificationsModule';
export { default as StorageOneSignalNotificationsView } from './StorageOneSignalNotificationsView';
export * from  './StorageOneSignalNotifications.types';
