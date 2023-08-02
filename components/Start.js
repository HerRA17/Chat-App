import { useState } from "react";
import { ImageBackground, StyleSheet, Text, TextInput, TouchableOpacity, View, Alert } from "react-native";
import { getAuth, signInAnonymously } from "firebase/auth";

// function Component
const Start = ({ navigation }) => {
  const [name, setName] = useState("");
  const [changeBackgroundColor, setChangeBackgroundColor] = useState("");
  const [color, setColor] = useState("");

  // authentication
  const auth = getAuth();
  const signInUser = () => {
    signInAnonymously(auth)
      .then((result) => {
        navigation.navigate("ChatScreen", {
          userID: result.user.uid,
          name: name,
          backgroundColor: changeBackgroundColor,
          color: color,
        });
        Alert.alert("Sign in Succesfully!");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        Alert.alert("Unable to sign in, try later again.", errorMessage);
        console.log(errorCode, errorMessage);
      });
  };

  //setting a background-color state to be passed on the Chat Screen
  const backgroundColor = ["black", "#474056", "#8A95A5", "#B9C6AE"];
  // function that sets color & Backgroundcolor
  const handleChangeColor = (backgroundColor, color) => {
    setChangeBackgroundColor(backgroundColor);
    setColor(color);
  };

  return (
    <ImageBackground
      source={require("../assets/Background-Image.png")}
      rezisedMode="cover"
      style={styles.image}
    >
      <View style={styles.container}>
        <Text style={styles.title}>Welcome to Chat App</Text>
        <View style={styles.containerItems}>
          <TextInput
            style={styles.textInput}
            value={name}
            onChangeText={setName}
            placeholder="Type your name here"
          />

          <Text style={styles.changeColor}>Choose Background Color:</Text>

          <View style={styles.changeBackgroundColorContainer}>
            <TouchableOpacity
              id="backgroundcolor1"
              accessible={true}
              accessibilityLabel="Choose background color"
              accessibilityHint="Let's you set your background color for the chat"
              accessibilityRole="button"
              style={[styles.backgroundColor1, { backgroundColor: "black" }]}
              onPress={() => handleChangeColor("black", "#f5f5f5")}
            ></TouchableOpacity>

            <TouchableOpacity
              id="backgroundcolor2"
              accessible={true}
              accessibilityLabel="Choose background color"
              accessibilityHint="Let's you set your background color for the chat"
              accessibilityRole="button"
              style={[styles.backgroundColor2, { backgroundColor: "#474056" }]}
              onPress={() => handleChangeColor("#474056", "#f5f5f5")}
            ></TouchableOpacity>

            <TouchableOpacity
              id="backgroundcolor3"
              accessible={true}
              accessibilityLabel="Choose background color"
              accessibilityHint="Let's you set your background color for the chat"
              accessibilityRole="button"
              style={[styles.backgroundColor3, { backgroundColor: "#8A95A5" }]}
              onPress={() => handleChangeColor("#8A95A5", "#000")}
            ></TouchableOpacity>

            <TouchableOpacity
              id="backgroundcolor4"
              accessible={true}
              accessibilityLabel="Choose background color"
              accessibilityHint="Let's you set your background color for the chat"
              accessibilityRole="button"
              style={[styles.backgroundColor4, { backgroundColor: "#B9C6AE" }]}
              onPress={() => handleChangeColor("#B9C6AE", "#000")}
            ></TouchableOpacity>
          </View>

          <TouchableOpacity
            accessible={true}
            accessibilityLabel="Navigation"
            accessibilityHint="Navigates to the chat Screen with the previous determined set-ups"
            accessibilityRole="button"
            onPress={() => {
              signInUser();
            }}
            style={styles.button}
            placeholder="Start Chatting"
          >
            <Text style={styles.buttonText}>Start Chatting</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
};
// style sheet - Css in assests
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  textInput: {
    width: "88%",
    color: "#757083",
    opacity: 0.5,
    padding: 15,
    borderWidth: 1,
    marginTop: 30,
    marginBottom: 20,
  },

  image: {
    width: "100%",
    height: "100%",
  },

  title: {
    color: "white",
    fontSize: 30,
    position: "absolute",
    top: 50,
    right: 65,
  },

  containerItems: {
    flexDirection: "column",
    position: "absolute",
    bottom: 60,
    right: 30,
    width: "88%",
    height: "44%",
    alignItems: "center",
    backgroundColor: "white",
  },

  changeColor: {
    fontSize: 16,
    fontWeight: 300,
    color: "#757083",
    opacity: 1,
    margin: 10,
    padding: 10,
  },

  changeBackgroundColorContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },

  backgroundColor1: {
    backgroundColor: "black",
    padding: 2,
    width: 50,
    height: 50,
    borderRadius: 50 / 2,
    margin: 10,
  },

  backgroundColor2: {
    backgroundColor: "#474056",
    padding: 2,
    width: 50,
    height: 50,
    borderRadius: 50 / 2,
    margin: 10,
  },

  backgroundColor3: {
    backgroundColor: "#8A95A5",
    padding: 2,
    width: 50,
    height: 50,
    borderRadius: 50 / 2,
    margin: 10,
  },

  backgroundColor4: {
    backgroundColor: "#B9C6AE",
    padding: 2,
    width: 50,
    height: 50,
    borderRadius: 50 / 2,
    margin: 10,
  },

  button: {
    alignItems: "center",
    justifyContent: "center",
    fontSize: 16,
    fontWeight: 600,
    color: "white",
    backgroundColor: "#757083",
    width: "88%",
    height: 50,
    marginTop: 45,
  },

  buttonText: {
    fontSize: 16,
    fontWeight: 600,
    color: "#f8f8ff",
  },
});
export default Start;
