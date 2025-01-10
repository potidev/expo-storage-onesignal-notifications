package com.potidev.expo.storage.onesinal.notifications

import androidx.room.Dao
import androidx.room.Insert
import androidx.room.Query

@Dao
interface StorageOneSignalNotificationDao {
    @Insert
    fun insert(notification: StorageOneSignalNotificatiosEntity)

    @Query("SELECT * FROM StorageOneSignalNotificatiosEntity ORDER BY timestamp DESC")
    fun getAll(): List<StorageOneSignalNotificatiosEntity>

    @Query("SELECT * FROM StorageOneSignalNotificatiosEntity WHERE id = :id LIMIT 1")
    fun getNotificationById(id: Int): StorageOneSignalNotificatiosEntity?

    @Query("DELETE FROM StorageOneSignalNotificatiosEntity")
    fun deleteAll()

    @Query("DELETE FROM StorageOneSignalNotificatiosEntity WHERE id = :id")
    fun deleteNotificationById(id: Int)
}