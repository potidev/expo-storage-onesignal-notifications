package com.potidev.expo.storage.onesinal.notifications

import com.onesignal.notifications.INotificationReceivedEvent;
import com.onesignal.notifications.INotificationServiceExtension;
import android.util.Log


class StorageOneSignalNotificationsListenerService : INotificationServiceExtension {
    override fun onNotificationReceived(event: INotificationReceivedEvent) {
        var notification = event.notification;

        Log.d("ExpoStorageNotificationsListener", "Notification received")
        Log.d("ExpoStorageNotificationsListener", notification.toString())
    }
}