package com.potidev.expo.storage.onesinal.notifications

import androidx.room.Database
import androidx.room.RoomDatabase

@Database(entities = [StorageOneSignalNotificatiosEntity::class], version = 1)
abstract class AppDatabase : RoomDatabase() {
    abstract fun notificationDao(): StorageOneSignalNotificationDao
}