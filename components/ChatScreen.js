import { useEffect, useState } from 'react';
import { StyleSheet, View, Text, Keyboard, KeyboardAvoidingView, Platform } from 'react-native';
import { GiftedChat, Bubble, InputToolbar } from 'react-native-gifted-chat';
import { collection, addDoc, onSnapshot, orderBy, query, where, DocumentSnapshot } from "firebase/firestore";
// import AsyncStorage from "@react-native-async-storage/async-storage";
// function Component
const ChatScreen = ({ db, route, navigation }) => {
    const { name, backgroundColor, color, userID } = route.params;
    // message constant initial state
    const [messages, setMessages] = useState([]);
    // function for the messages to store, retrieve data from firebase (even if none has been created previously)
    const onSend = (newMessages) => {
      addDoc(collection(db, "messages"), newMessages[0])
    };
  // passed along selected values from Start-Screen & callback function for messages
    useEffect(() => {
      navigation.setOptions({ title: name})
        const q = query(collection(db, "messages"), orderBy("createdAt", "desc"));
        const unsubMessages = onSnapshot(q, (docs) => {
          let newMessages= [];
          docs.forEach(doc => {
            newMessages.push({ id: doc.id, ...doc.data()})
            createdAt: new Date(doc.data().createdAt.toMillis())
          });
          setMessages(newMessages);
        })
        return () => {
          if (unsubMessages) unsubMessages();
        }
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
     user={{_id: userID,
      username:name}}
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