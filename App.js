import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
// import Screens
import Start from "./components/Start";
import ChatScreen from "./components/ChatScreen";
// import react Navigation
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import firebase & firestore
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// import { getAnalytics } from "firebase/analytics";

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
// Initialize Cloud Firestore & get a ref to the service
const db = getFirestore(app);

// create the navigator
const Stack = createNativeStackNavigator();
const App = () => {
  return (
    <NavigationContainer styles={styles.container}>
      <Stack.Navigator
      initialRouteName="Start"
      >
        <Stack.Screen 
        name="Start"
        component={Start}/> 
        <Stack.Screen 
        name="ChatScreen"
        >
          {(props) => <ChatScreen {...props} db={db}/>}
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