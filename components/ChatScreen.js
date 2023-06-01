import { useEffect } from 'react';
import { StyleSheet, View, Text } from 'react-native';
// function Component
const ChatScreen = ({ route, navigation }) => {
    const { name } = route.params;
    const { backgroundcolor } = route.params;

    useEffect(() => {
        navigation.setOptions({title: name})
    }, []);
    
 return (
   <View style={styles.container}>
     <Text>Hello There, you are in the Chat Screen</Text>
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