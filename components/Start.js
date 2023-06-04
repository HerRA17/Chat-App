import { useState } from "react";
import { Button, Image, ImageBackground, Pressable, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

// function Component
const Start = ({ navigation }) => {
    const [name, setName] = useState("");
    const [ changeBackgroundColor , setChangeBackgroundColor] = useState("");
    //setting a background-color state to be passed on the Chat Screen
    const backgroundColor = ["black" , "#474056" , "#8A95A5" , "#B9C6AE"];
    
    
    return(
        <ImageBackground source={require("../assets/Background-Image.png")}  rezisedMode="cover" style={styles.image} >
            <View style={styles.container}>
            <Text style={styles.title}>Welcome to Chat App</Text>
            <View style={styles.containerItems}>
            <TextInput
                style={styles.textInput}
                value={name}
                onChange={setName}

                placeholder="Type your name here"
            />

            <Text style={styles.changeColor}>Choose Background Color:</Text>
            
            <View style={styles.changeBackgroundColorContainer}>
            <TouchableOpacity 
            id="backgroundcolor1"
            style={[styles.backgroundColor1, {backgroundColor: "black"}]}
            onPress={() => setChangeBackgroundColor("black")}
            ></TouchableOpacity>

            <TouchableOpacity 
            id="backgroundcolor2"
            style={[styles.backgroundColor2, {backgroundColor: "#474056"}]}
            onPress={() => setChangeBackgroundColor("#474056")}
            ></TouchableOpacity>

            <TouchableOpacity 
            id="backgroundcolor3"
            style={[styles.backgroundColor3, {backgroundColor: "#8A95A5"}]}
            onPress={() => setChangeBackgroundColor("#8A95A5")}
            ></TouchableOpacity>

            <TouchableOpacity 
            id="backgroundcolor4"
            style={[styles.backgroundColor4, {backgroundColor: "#B9C6AE"}]}
            onPress={() => setChangeBackgroundColor("#B9C6AE")}
            ></TouchableOpacity>
            </View>

            <TouchableOpacity
             onPress={() => navigation.navigate("ChatScreen", { name: name, backgroundColor: changeBackgroundColor })}
             style={styles.button}
             placeholder="Start Chatting"
             >
                <Text style={styles.buttonText}>Start Chatting</Text>
            </TouchableOpacity>
            </View>
        </View>
        </ImageBackground>
        
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
        marginTop: 30,
        marginBottom: 20
    },
    image: {
        width: "100%",
        height: "100%"
    },
    title:{
        color: "white",
        fontSize: 30,
        position: "absolute",
        top: 50,
        right: 65
    },
    containerItems: {
        flexDirection: "column",
        position: "absolute",
        bottom: 60,
        right: 30,
        width: "88%",
        height: "44%",
        alignItems: "center",
        backgroundColor: "white"
    },
    changeColor:{
        fontSize: 16, 
        fontWeight: 300,
        fontColor: "#757083",
        opacity: "100%",
        margin: 10,
        padding: 10,
    },
    changeBackgroundColorContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "felx-start"
    },
    backgroundColor1: {
        backgroundColor: "black",
        padding: 2,
        width: 50 ,
        height: 50 ,
        borderRadius: 50/2,
        margin: 10,
    },
    backgroundColor2: {
        backgroundColor: "#474056",
        padding: 2,
        width: 50 ,
        height: 50 ,
        borderRadius: 50/2 ,
        margin: 10,
    },
    backgroundColor3: {
        backgroundColor: "#8A95A5",
        padding: 2,
        width: 50 ,
        height: 50 ,
        borderRadius: 50/2 ,
        margin: 10,
    },
    backgroundColor4: {
        backgroundColor: "#B9C6AE",
        padding: 2,
        width: 50 ,
        height: 50 ,
        borderRadius: 50/2 ,
        margin: 10,
        
    },
    button: {
        alignItems: "center",
        justifyContent: "center",
        fontSize: 16,
        fontWeight: 600,
        fontColor: "white",
        backgroundColor: "#757083",
        width: "88%",
        height: 50,
        marginTop: 45,
    },
    buttonText: {
        fontSize: 16,
        fontWeight: 600,
        fontColor: "#f8f8ff",
    }
});
export default Start;