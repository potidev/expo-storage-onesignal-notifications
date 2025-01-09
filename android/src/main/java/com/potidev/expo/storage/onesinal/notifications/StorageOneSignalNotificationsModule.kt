package com.potidev.expo.storage.onesinal.notifications

import expo.modules.kotlin.modules.Module
import expo.modules.kotlin.modules.ModuleDefinition
import java.net.URL

class StorageOneSignalNotificationsModule : Module() {
  override fun definition() = ModuleDefinition {
    Name("StorageOneSignalNotificationsModule")

    // Defines a JavaScript synchronous function that runs the native code on the JavaScript thread.
    Function("hello") {
      "Hello world! 👋"
    }
  }
}
