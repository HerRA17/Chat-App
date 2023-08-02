import { useEffect, useState } from "react";
import { StyleSheet, View, Text, Keyboard, KeyboardAvoidingView, Platform } from "react-native";
import { GiftedChat, Bubble, InputToolbar } from "react-native-gifted-chat";
import { collection, addDoc, getDocs, onSnapshot, orderBy, query } from "firebase/firestore";
import AsyncStorage from "@react-native-async-storage/async-storage";
import MapView from "react-native-maps";

// import Functions-component (camera & geolocation)
import CustomActions from "./CustomActions";

// function Component
const ChatScreen = ({ db, isConnected, navigation, route, storage }) => {
  const { name, backgroundColor, color, userID } = route.params;
  // message constant initial state
  const [messages, setMessages] = useState([]);

  let unsubMessages;
  // passed along selected values from Start-Screen & callback function for messages
  useEffect(() => {
    navigation.setOptions({ title: name });

    if (isConnected === true) {
      // unregister current onSnapshot() listener to avoid registering multiple listeners when useEffect codeis re-executed
      if (unsubMessages) unsubMessages();
      unsubMessages = null;

      const q = query(collection(db, "messages"), orderBy("createdAt", "desc"));
      unsubMessages = onSnapshot(q, (docs) => {
        let newMessages = [];
        docs.forEach((doc) => {
          newMessages.push({
            id: doc.id,
            ...doc.data(),
            createdAt: new Date(doc.data().createdAt.toMillis()),
          });
        });
        cacheMessages(newMessages);
        setMessages(newMessages);
      });
    } else loadCachedMessages();
    return () => {
      if (unsubMessages) unsubMessages();
    };
  }, [isConnected]);
  // async function to load messages since there is no connection
  const loadCachedMessages = async () => {
    const cachedMessages = (await AsyncStorage.getItem("messages")) || [];
    setMessages(JSON.parse(cachedMessages));
  };

  const cacheMessages = async (messagesToCache) => {
    try {
      await AsyncStorage.setItem("messages", JSON.stringify(messagesToCache));
    } catch (error) {
      console.log(error.message);
    }
  };

  const onSend = (newMessages) => {
    addDoc(collection(db, "messages"), newMessages[0]);
  };

  const renderInputToolbar = (props) => {
    if (isConnected === true)
      return <InputToolbar {...props} containerStyle={styles.toolbar} />;
    else return null;
  };
  // control keyboard events
  Keyboard.dismiss();
  // bubble rendering & styling
  const renderBubble = (props) => {
    return (
      <Bubble
        {...props}
        // conditional to set better implementation of bubbles rendered
        wrapperStyle={{
          right: {
            // backgroundColor: "#2AAA8A",
            backgroundColor:
              backgroundColor === "black" || "#474056"
                ? "lightblue"
                : "lightblue" || backgroundColor === "#8A95A5" || "#B9C6AE"
                ? "black"
                : "black",
          },
          left: {
            backgroundColor:
              backgroundColor === "black" || "#474056"
                ? "whitesmoke"
                : "whitesmoke" || backgroundColor === "#8A95A5" || "#B9C6AE"
                ? "darkblue"
                : "darkblue",
          },
        }}
      />
    );
  };

  // component for taking/selecting fotos & geolocation ->test something else
  const renderCustomActions = (props) => {
    return (
      <CustomActions
        userID={userID}
        onSend={onSend}
        storage={storage}
        {...props}
      />
    );
  };

  const renderCustomView = (props) => {
    const { currentMessage } = props;
    if (currentMessage.location) {
      return (
        <MapView
          style={{ width: 150, height: 100, borderRadius: 13, margin: 3 }}
          region={{
            latitude: currentMessage.location.latitude,
            longitude: currentMessage.location.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        />
      );
    }
    return null;
  };

  return (
    <View style={[styles.container, { backgroundColor: backgroundColor }]}>
      <Text style={[styles.title, { color: color }]}>
        Hello there, you are in the Chat Screen
      </Text>
      <GiftedChat
        messages={messages}
        renderBubble={renderBubble}
        onSend={(messages) => onSend(messages)}
        renderInputToolbar={renderInputToolbar}
        renderActions={renderCustomActions}
        renderCustomView={renderCustomView}
        user={{
          _id: userID,
          name,
        }}
      />

      {Platform.OS === "android" ? (
        <KeyboardAvoidingView behavior="height" />
      ) : null}
      {Platform.OS === "ios" ? (
        <KeyboardAvoidingView behavior="height" />
      ) : null}
    </View>
  );
};
// style sheet
const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  title: {
    margin: 8,
    alignItems: "center",
    fontSize: 15,
  },
});

export default ChatScreen;
