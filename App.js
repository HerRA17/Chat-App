// import Screens
import Start from "./components/Start";
import ChatScreen from "./components/ChatScreen";
// import react Navigation
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import functions for initialize firestore
import { initializeApp } from "firebase/app";
import { disableNetwork, enableNetwork, getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// import { getAnalytics } from "firebase/analytics";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Alert, LogBox } from "react-native";
import { useNetInfo } from '@react-native-community/netinfo';
import { useEffect } from "react";
import { firebaseConfig } from "./config"

// create the navigator
const Stack = createNativeStackNavigator();

LogBox.ignoreLogs(["AsyncStorage has been extracted from"]);

const App = () => {
  const connectionStatus = useNetInfo();

// Firebase configuration contains the information in an .env file for security purposes
// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Firebase databse & storage handlers
const db = getFirestore(app);
const storage = getStorage(app);


  useEffect(() => {
    if (connectionStatus.isConnected === false) {
      Alert.alert("Connection Lost!");
      disableNetwork(db);
    } else if (connectionStatus.isConnected === true) {
      enableNetwork(db);
    }
  }, [connectionStatus.isConnected]);

  return (
    <NavigationContainer styles={styles.container}>
      <Stack.Navigator initialRouteName="Start">
        <Stack.Screen name="Start" component={Start}/> 
        <Stack.Screen name="ChatScreen">
          {(props) => <ChatScreen {...props}  isConnected={connectionStatus.isConnected} db={db} storage={storage} />}
          </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default App;