import { Alert, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useActionSheet } from "@expo/react-native-action-sheet";
import * as ImagePicker from "expo-image-picker";
import * as Location from "expo-location";
import { uploadBytes, ref, getDownloadURL } from "firebase/storage";
import { useCallback, useEffect, useState } from "react";

const CustomActions = ({ wrapperStyle, iconTextStyle, onSend, storage, userID }) => {
    const actionSheet = useActionSheet();
    // const [image, setImage] = useState(null);
    
    const onActionPress = useCallback(() => {
        const options =  ["Choose From Library", "Take Picture", "Send Location", "Cancel"];
        const cancelButtonIndex = options.length - 1;
        actionSheet.showActionSheetWithOptions({
            options, cancelButtonIndex,
        },
        async (buttonIndex) => {
            switch (buttonIndex) {
                case 0:
                    await pickImage().catch(console.error);
                    console.log("user wants to choose pick");
                    return;
                case 1:
                    await takePhoto(onSend).catch(console.error);
                    console.log("user wants to take pick");
                    return;
                case 2:
                    await getLocation().catch(console.error);
                default:
                
            }
        },
      )
    });
            
    

    const uploadAndSendImage = async(imageURI) => {
        const uniqueRefString = generateReference(imageURI);
        const newUploadRef = ref(storage, uniqueRefString);
        const response = await fetch(imageURI);
        const blob = await response.blob();
        uploadBytes(newUploadRef, blob).then(async (snapshot) => {
        const imageURL = await getDownloadURL(snapshot.ref)
        onSend({ image: imageURL })
            });
    }

    const generateReference = (uri) => {
        // this will get the file name reference from the uri
        const imageName = uri.split("/")[uri.split("/").length - 1];
        const timeStamp = (new Date()).getTime();
        return `${userID}-${timeStamp}-${imageName}`;
    }

    const pickImage = async () => {
        let permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (permission?.granted) {
            let result = await ImagePicker.launchImageLibraryAsync();
        if (!result.canceled)  await uploadAndSendImage(result.assets[0].uri)
        else Alert.alert("Permission has not been granted")
            }
        }
    
    
    const takePhoto = async () => {
        console.log("takePhoto");
        let permission = await ImagePicker.requestCameraPermissionsAsync();
        if(permission?.granted) {
            console.log(permission);
            let result = await ImagePicker.launchCameraAsync();
        if(!result.canceled) await uploadAndSendImage(result.assets[0].uri);
        else Alert.alert("Permission has not been granted")
        }
    }

    const getLocation = async () => {
        let permission = await Location.requestForegroundPermissionsAsync();
        if (permission?.granted) {
            const location = await Location.getCurrentPositionAsync({});
            if (location) {
              onSend({
                location: {
                    longitude: location.coords.longitude,
                    latitude: location.coords.latitude
                    }
                })
            } else Alert.alert("Error ocurred while fetching location");  
        } else Alert.alert("Permission to read location is not granted"); 
    }
    
    
    return(
        <TouchableOpacity
        style={styles.container} 
        onPress={onActionPress}
        accessible={true}
        accessibilityLabel="More options"
        accessibilityHint="Lets you choose take pictures, choose images, and send geolocation"
        accessibilityRole="button" >
          <View style={[styles.wrapper, wrapperStyle]}>
          <Text style={[styles.iconText, iconTextStyle]}>+</Text>
          </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        width: 32,
        height: 32,
        marginLeft: 10,
        marginRight: 10
    },
    wrapper: {
        borderRadius: 15,
        borderColor: "#b2b2b2",
        borderWidth: 2,
        flex: 1,
        
    },
    iconText: {
        color: "#000000",
        fontWeight: "bold",
        fontSize: 18,
        backgroundColor: "transparent",
        textAlign: "center",
        alignContent: "center",
        marginBottom: 5,
        marginTop: 2,
        marginLeft: "auto",
        marginRight: "auto",
        
    }
})

export default CustomActions;