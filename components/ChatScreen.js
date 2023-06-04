import { useEffect } from 'react';
import { StyleSheet, View, Text } from 'react-native';
// function Component
const ChatScreen = ({ route, navigation }) => {
    const { name, changeBackgroundColor } = route.params;
  // passed along selected values from Start-Screen 
    useEffect(() => {
        navigation.setOptions({ title: name})
    }, []);
    
 return (
   <View style={[styles.container, {backgroundColor: changeBackgroundColor}]} >
     <Text>Hello there, you are in the Chat Screen</Text>
    </View>
 );
}
// style sheet
const styles = StyleSheet.create({
 container: {
   flex: 1,
   justifyContent: 'center',
   alignItems: 'center'
 }
});

export default ChatScreen;