package com.potidev.expo.storage.onesinal.notifications

import android.content.Context
import com.google.gson.Gson
import com.onesignal.notifications.INotificationReceivedEvent;
import com.onesignal.notifications.INotificationServiceExtension;
import android.util.Log
import androidx.room.Room

import android.app.NotificationManager


import com.google.firebase.messaging.FirebaseMessagingService
import com.google.firebase.messaging.RemoteMessage



class StorageOneSignalNotificationsListenerService : INotificationServiceExtension {
    override fun onNotificationReceived(event: INotificationReceivedEvent) {
        var notificationData = event.notification;

        Log.d("StorageOneSignalNotificationsListenerService", "Notification received")

        val title = notificationData.title ?: ""
        val body = notificationData.body ?: ""
        val jsonData = Gson().toJson(notificationData.rawPayload)

        saveNotification(event.context, title, body, jsonData)
    }

    private fun saveNotification(context: Context, title: String, body: String, jsonData: String) {
        val db = Room.databaseBuilder(
            context.applicationContext,
            AppDatabase::class.java, "one-signal-notifications-database"
        ).build()

        val notificationDao = db.notificationDao()
        val newNotification = StorageOneSignalNotificatiosEntity(
            title = title,
            body = body,
            timestamp = System.currentTimeMillis(),
            jsonData = jsonData
        )

        // Save to database on a background thread
        Thread {
            notificationDao.insert(newNotification)
        }.start()
    }
}