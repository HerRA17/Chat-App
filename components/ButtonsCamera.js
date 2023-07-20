import * as React from "react"; 
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { Entypo } from "@expo/vector-icons";

export default function ButtonCamera({title, onPress, icon ,color}) {
    return(
        <TouchableOpacity onPress={onPress} style={styles.button}>
            <Entypo name={icon} size={28} color={color ? color : "#f1f1f1"}/>
            <Text style={styles.text} title="title">{title} </Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    button: {
        height: 40,
        flexDirection: "row",
        alignContent: "center",
        justifyContent: "center",
        padding: 10,
    },
    text: {
        fontWeight: "bold",
        fontSize: 16,
        color: "#f1f1f1",
        marginleft: 10,
    }
})