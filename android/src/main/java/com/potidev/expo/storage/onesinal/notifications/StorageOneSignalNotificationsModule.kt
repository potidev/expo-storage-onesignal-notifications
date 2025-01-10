package com.potidev.expo.storage.onesinal.notifications

import expo.modules.kotlin.modules.Module
import expo.modules.kotlin.modules.ModuleDefinition
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.withContext
import androidx.room.Room
import kotlinx.coroutines.runBlocking

class StorageOneSignalNotificationsModule : Module() {
  private val context
    get() = requireNotNull(appContext.reactContext)

  override fun definition() = ModuleDefinition {
    Name("StorageOneSignalNotificationsModule")

    AsyncFunction("getNotifications") {
      return@AsyncFunction runBlocking {
        getNotificationsFromDatabase()
      }
    }

    AsyncFunction("getNotificationById") { id: Int ->
      return@AsyncFunction runBlocking {
        getNotificationById(id)
      }
    }

    AsyncFunction("deleteAllNotifications") {
      return@AsyncFunction runBlocking {
        deleteAllNotifications()
      } 
    }

    AsyncFunction("deleteNotificationById") { id: Int ->
      return@AsyncFunction runBlocking {
        deleteNotificationById(id)
      }
    }
  }

  private suspend fun getNotificationsFromDatabase(): List<Map<String, Any>> {
    return withContext(Dispatchers.IO) {
      val db = Room.databaseBuilder(
        context,
        AppDatabase::class.java, "one-signal-notifications-database"
      ).build()

      val notificationDao = db.notificationDao()
      val notifications = notificationDao.getAll()

      notifications.map { notification ->
        mapOf(
          "id" to notification.id,
          "title" to notification.title,
          "body" to notification.body,
          "jsonData" to notification.jsonData,
          "timestamp" to notification.timestamp
        )
      }
    }
  }

  private suspend fun getNotificationById(id: Int): Map<String, Any>? {
    return withContext(Dispatchers.IO) {
      val db = Room.databaseBuilder(
        context,
        AppDatabase::class.java, "one-signal-notifications-database"
      ).build()

      val notificationDao = db.notificationDao()
      val notification = notificationDao.getNotificationById(id)

      notification?.let {
        mapOf(
          "id" to it.id,
          "title" to it.title,
          "body" to it.body,
          "jsonData" to it.jsonData,
          "timestamp" to it.timestamp
        )
      }
    }
  }

  private suspend fun deleteAllNotifications() {
    withContext(Dispatchers.IO) {
      val db = Room.databaseBuilder(
        context,
        AppDatabase::class.java, "one-signal-notifications-database"
      ).build()

      val notificationDao = db.notificationDao()
      notificationDao.deleteAll()
    }
  }

  private suspend fun deleteNotificationById(id: Int) {
    withContext(Dispatchers.IO) {
      val db = Room.databaseBuilder(
        context,
        AppDatabase::class.java, "one-signal-notifications-database"
      ).build()

      val notificationDao = db.notificationDao()
      notificationDao.deleteNotificationById(id)
    }
  }
}
