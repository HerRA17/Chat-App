import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
// import Screens
import Start from "./components/Start";
import ChatScreen from "./components/ChatScreen";
// import react Navigation
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
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
        component={ChatScreen}/>
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