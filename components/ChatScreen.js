import { useEffect, useState } from 'react';
import { StyleSheet, View, Text, Keyboard, KeyboardAvoidingView, Platform } from 'react-native';
import { GiftedChat, Bubble, InputToolbar } from 'react-native-gifted-chat';
// function Component
const ChatScreen = ({ route, navigation }) => {
    const { name, backgroundColor, color } = route.params;
    // 
    const [messages, setMessages] = useState([]);
    // 
    const onSend = (newMessages) => {
      setMessages(previousMessages => GiftedChat.append(previousMessages, newMessages))
    };
  // passed along selected values from Start-Screen 
    useEffect(() => {
        setMessages([
          {
            _id: 1,
            text: "Hello there, you are in the chat session!",
            createdAt: new Date(),
            user: {
              _id: 2,
              name: "React Native",
              avatar: "https://placeimg.com/140/140/any"
            },
          },
          {
            _id: 2,
            text: "This is a system message",
            createdAt: new Date(),
            system: true
          }
        ])
    }, []);
// setting the title to what was prev passed from Start screen
    useEffect(() => {
      navigation.setOptions({ title: name})
    }, []);
    // console.log(showAsyncStorageContentInDev());
function renderInputToolbar (props) {
  return (
    <InputToolbar {...props} containerStyle={styles.toolbar} />
  )
}
// control keyboard events
Keyboard.dismiss();
// bubble rendering & styling
const renderBubble = (props) => {
  return <Bubble
    {...props}
    wrapperStyle={{ right: {
      backgroundColor: "#2AAA8A",
      
      },
      left: {
        backgroundColor: "#FAC898"
      }
    }}
  />
}
 return (
   <View style={[styles.container, {backgroundColor: backgroundColor}]} >
     <Text style={[styles.title, {color: color}]}>Hello there, you are in the Chat Screen</Text>
     <GiftedChat 
     messages={messages}
     renderBubble={renderBubble}
     onSend={messages=> onSend(messages)}
     renderInputToolbar={renderInputToolbar}
     user={{_id: 1}}
     />
      { Platform.OS === "android" ? <KeyboardAvoidingView behavior="height"/> : null}
      { Platform.OS === "ios" ? <KeyboardAvoidingView behavior="height"/> : null}
   
     </View>
 );
}
// style sheet
const styles = StyleSheet.create({
 container: {
   flex: 1,
  //  if(backgroundColor === "white")
  width: "100%",
  height: "100%"
 },
 title:{
  margin: 8,
  alignItems: "center",
  fontSize: "15" 
 },

});

export default ChatScreen;