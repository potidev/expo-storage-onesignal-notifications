package com.potidev.expo.storage.onesinal.notifications

import androidx.room.Entity
import androidx.room.PrimaryKey

@Entity
data class StorageOneSignalNotificatiosEntity(
    @PrimaryKey(autoGenerate = true) val id: Int = 0,
    val title: String,
    val body: String,
    val jsonData: String,
    val timestamp: Long
)
