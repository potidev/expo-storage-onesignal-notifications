import { registerWebModule, NativeModule } from 'expo';

import { StorageOneSignalNotificationsModuleEvents } from './StorageOneSignalNotifications.types';

class StorageOneSignalNotificationsModule extends NativeModule<StorageOneSignalNotificationsModuleEvents> {
  PI = Math.PI;
  async setValueAsync(value: string): Promise<void> {
    this.emit('onChange', { value });
  }
  hello() {
    return 'Hello world! 👋';
  }
}

export default registerWebModule(StorageOneSignalNotificationsModule);
