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
import { StyleSheet, Text, View, Alert, LogBox } from "react-native";
import { useNetInfo } from '@react-native-community/netinfo';
import { useEffect, useState } from "react";

// create the navigator
const Stack = createNativeStackNavigator();

LogBox.ignoreLogs(["AsyncStorage has been extracted from"]);

const App = () => {
  const connectionStatus = useNetInfo();

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCjjYirTVXnYNk_pPtYRwyIxM5ydz8ZmmI",
  authDomain: "chat-app-dde81.firebaseapp.com",
  projectId: "chat-app-dde81",
  storageBucket: "chat-app-dde81.appspot.com",
  messagingSenderId: "386820352799",
  appId: "1:386820352799:web:76afe21f04475d75bb1e2a",
  measurementId: "G-4RYVRYC1EY"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
// Initialize Firebase databse & storage handlers
const db = getFirestore(app);
const storage = getFirestore(app);


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