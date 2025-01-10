import { SafeAreaView, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { OneSignalStorage, OneSignalDatabaseItem } from '@potidev/expo-storage-onesignal-notifications';

import { LogLevel, OneSignal } from 'react-native-onesignal';
import Constants from "expo-constants";
import { useEffect, useState } from 'react';
import { format } from "date-fns";

OneSignal.Debug.setLogLevel(LogLevel.Verbose);
OneSignal.initialize(Constants.expoConfig?.extra?.oneSignalAppId);

// Also need enable notifications to complete OneSignal setup
OneSignal.Notifications.requestPermission(true)

export default function App() {
  const [notifications, setNotifications] = useState<OneSignalDatabaseItem[]>([]);

  useEffect(() => {
    requestDataBase();
  }, [])

  const requestDataBase = async () => {
    try {
      console.log("getNotifications()")
      const response = await OneSignalStorage.getNotifications();
      console.log("Success!")
      setNotifications(response);
      console.log(response);
      console.log(JSON.parse(response[0].jsonData))
    } catch(error) {
      console.log("Error :(")
      console.log(error);
    }
  }

  const handleClearAll = async () => {
    await OneSignalStorage.deleteAllNotifications(); 
    requestDataBase();
  }

  const handleClear = async (id: string) => {
    await OneSignalStorage.deleteNotificationById(parseInt(id)); 
    requestDataBase();
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.container}>
        <Text style={styles.header}>Notifications</Text>
        <TouchableOpacity onPress={handleClearAll} style={{ paddingLeft: 20 }}>
          <Text>
            Clear All
          </Text>
        </TouchableOpacity>
        {
          notifications.map(({ body, id, jsonData, timestamp, title }) => {
            return (
              <Group name={title} key={id}>
                <Text>{body}</Text>
                <Text>{format(new Date(timestamp), "dd/MM/yyyy HH:mm:ss")}</Text>
                <TouchableOpacity style={{ marginTop: 4 }} onPress={() => handleClear(id)}>
                  <Text>
                    Delete
                  </Text>
                </TouchableOpacity>
              </Group>
            )
          })
        }
        
      </ScrollView>
    </SafeAreaView>
  );
}

function Group(props: { name: string; children: React.ReactNode }) {
  return (
    <View style={styles.group}>
      <Text style={styles.groupHeader}>{props.name}</Text>
      {props.children}
    </View>
  );
}

const styles = {
  header: {
    fontSize: 30,
    margin: 16,
  },
  groupHeader: {
    fontSize: 20,
    marginBottom: 8,
  },
  group: {
    margin: 16,
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
  },
  container: {
    flex: 1,
    backgroundColor: '#eee',
  },
  view: {
    flex: 1,
    height: 200,
  },
};
