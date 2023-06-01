import { useState } from "react";
import { Button, Image, ImageBackground, Pressable, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

// function Component
const Start = ({ navigation }) => {
    const [name, setName] = useState("");
    const [selected, setSelected] = useState(false);
    //setting a background-color state to be passed on the Chat Screen
    const [backgroundcolor, setBackgroundcolor] = useState(""); 
    // const changeBackgroundColor = {
    //     if (backgroundcolor1 ) {

    //     } else if {

    //     } else if {

    //     } else
    // }

    return(
        <View style={styles.container}>
            <ImageBackground source={require("../assets/Background-Image.png")}  rezisedMode="cover" style={styles.image} >
            <Text style={styles.title}>Welcome to Chat App</Text>
            <View style={styles.containerItems}>
            <TextInput
                style={styles.textInput}
                value={name}
                onChange={setName}
                placeholder="Type your name here"
            />
            <Text styles={styles.changeColor}>Choose Background Color:</Text>
            <Pressable>
            <TouchableOpacity 
            id="backgroundcolor1"
            style={styles.backgroundColor1}
            onPress={() => setBackgroundcolor(!backgroundcolor)}
            onPressIn={() => setSelected(!selected)}
            style={{}}
            ></TouchableOpacity>
            <TouchableOpacity 
            id="backgroundcolor2"
            style={styles.backgroundColor2}
            onPress={() => setBackgroundcolor(!backgroundcolor)}
            ></TouchableOpacity>
            <TouchableOpacity 
            id="backgroundcolor3"
            style={styles.backgroundColor3}
            onPress={() => setBackgroundcolor(!backgroundcolor)}
            ></TouchableOpacity>
            <TouchableOpacity 
            id="backgroundcolor4"
            style={styles.backgroundColor4}
            onPress={() => setBackgroundcolor(!backgroundcolor)}
            ></TouchableOpacity>
            </Pressable>
            <TouchableOpacity
             onPress={() => navigation.navigate("ChatScreen", { name: name, backgroundcolor: backgroundcolor })}
             style={styles.button}
             placeholder="Start Chatting"
             >
                <Text style={styles.buttonText}>Start Chatting</Text>
            </TouchableOpacity>
            </View>
            </ImageBackground>
        </View>
    )
}
// style sheet
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    textInput: {
        width: "88%",
        color: "#757083",
        opacity: "50%",
        padding: 15,
        borderWidth: 1, 
        marginTop: 15,
        marginBottom: 15
    },
    image: {
        flex:1,
        width: "90%",
        height: "90%"
    },
    title:{
        color: "white",
        fontSize: 30
    },
    containerItems: {
        flex: 3,
        width: "88%",
        height: "44%",
        alignItems: "center",
        backgroundColor: "white"
    },
    changeColor:{
        fontSize: 16, 
        fontWeight: 300,
        fontColor: "#757083",
        opacity: "100%"
    },
    backgroundColor1: {
        backgroundColor: "090C08",
        padding: 2,
        width: 50 ,
        height: 50 ,
        borderRadius: 50/2,
        margin: 4
    },
    backgroundColor2: {
        backgroundColor: "#474056",
        padding: 2,
        width: 50 ,
        height: 50 ,
        borderRadius: 50/2 ,
        margin: 4
    },
    backgroundColor3: {
        backgroundColor: "#8A95A5",
        padding: 4,
        width: 50 ,
        height: 50 ,
        borderRadius: 50/2 ,
        margin: 4
    },
    backgroundColor4: {
        backgroundColor: "#B9C6AE",
        padding: 2,
        width: 50 ,
        height: 50 ,
        borderRadius: 50/2 ,
        margin: 4
    },
    button: {
        alignItems: "center",
        fontSize: 16,
        fontWeight: 600,
        fontColor: "#f8f8ff",
        backgroundColor: "#757083",
        width: "88%",
        height: 30,
    },
    buttonText: {
        fontSize: 16,
        fontWeight: 600,
        fontColor: "#f8f8ff",
    }
});
export default Start;