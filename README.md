
<div style="display: flex; gap: 16px; flex-direction: row;">

  ![](.github/assets/svg/logo.svg)

  ![](.github/assets/svg/one-signal.svg)

</div>


# Expo Module - @potidev/expo-storage-onesignal-notifications
[![](https://img.shields.io/badge/Beta-0.1.0-purple)](https://www.npmjs.com/package/@potidev/expo-storage-onesignal-notifications)
[![](https://img.shields.io/badge/Android-Done-green)]()
[![](https://img.shields.io/badge/iOS-In_Progress-yellow)]()
[![](https://img.shields.io/badge/Web-No_Suport-red)]()

Expo native module to save notifications received by one signal in local database.

> [!WARNING]
> This module is not officially distributed by the OneSignal team. I needed to integrate with expo a way to monitor OneSignal notifications and save them on the device, so I made this native module on my own. For now, it only works for Android.


# API documentation

This is a simple exemple code of how to use:

```tsx
import { useEffect, useState } from 'react';
import { Platform } from 'react-native';
import { OneSignalStorage, OneSignalDatabaseItem } from '@potidev/expo-storage-onesignal-notifications';

export default function App() {
  const [notifications, setNotifications] = useState<OneSignalDatabaseItem[]>([]);

  useEffect(() => {
    if(Platform.OS === "android") {
      getNotifications();
    }
  }, [])

  const getNotifications = async () => {
    try {
      const notifications = await OneSignalStorage.getNotifications();
      setNotifications(response);
      console.log(response);
      console.log(JSON.parse(response[0].jsonData))
    } catch(error) {
      console.log(error);
    }
  }

  const handleClearAll = async () => {
    if(Platform.OS === "android") {
      await OneSignalStorage.deleteAllNotifications(); 
      requestDataBase();
    }
  }

  const handleClear = async (id: string) => {
    if(Platform.OS === "android") {
      await OneSignalStorage.deleteNotificationById(parseInt(id)); 
      requestDataBase();
    }
  }

  // Your render code here
}
```

# Installation in managed Expo projects

For [managed](https://docs.expo.dev/archive/managed-vs-bare/) Expo projects, please follow the installation instructions in the [API documentation for the latest stable release](#api-documentation). If you follow the link and there is no documentation available then this library is not yet usable within managed projects &mdash; it is likely to be included in an upcoming Expo SDK release.

# Installation in bare React Native projects

For bare React Native projects, you must ensure that you have [installed and configured the `expo` package](https://docs.expo.dev/bare/installing-expo-modules/) before continuing.

### Add the package to your npm dependencies

```bash
npm install @potidev/expo-storage-onesignal-notifications
```

### Configure for iOS

Run `npx pod-install` after installing the npm package.
