import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useActionSheet } from "@expo/react-native-action-sheet";
import * as ImagePicker from "expo-image-picker";
import * as Location from "expo-location";
import { getLocationAsync, pickImageAsync, takePictureAsync,
  } from './mediaUtils'

import { uploadBytes, ref, getDownloadURL } from "firebase/storage";

const CustomActions = ({ wrapperStyle, iconTextStyle, onSend, storage, userID }) => {
    const actionSheet = useActionSheet();

    const onActionPress = () => {
        const options =  ["Choose From Library", "Take Picture", "Send Location", "Cancel"];
        const cancelButtonIndex = options.length - 1;
        actionSheet.showActionSheetWithOptions({
            options, cancelButtonIndex,
        },
        async (buttonIndex) => {
            switch (buttonIndex) {
                case 0:
                    pickImage();
                    // console.log("user wants to pick an image");
                    return;
                case 1:
                        takePhoto();
                        // console.log("user wants to take a photo");
                        return;
                case 2:
                    getLocation();
                    // console.log("user wants to get their location");
                    default:
            }
        },
      );
    };

    const pickImage = async () => {
        let permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (permission?.granted) {
            let result = await ImagePicker.launchImageLibraryAsync();
        if (permission?.canceled) await uploadAndSendImage(result.assets[0].uri);
        else Alert.alert("Permission has not been granted")
        }
    }
    
    const takePhoto = async () => {
        let permission = await ImagePicker.requestCameraPermissionsAsync();
        if(permission?.granted) {
            let result = await ImagePicker.launchCameraAsync();
            if(!result.canceled) setImage(result.assets[0]);
            else setImage(null)
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
    
    const generateReference = (uri) => {
        // this will get the file name reference from the uri
        const timeStamp = (new Date()).getTime();
        const imageName = uri.split("/")[uri.split("/").length - 1];
        return `${userID}-${timeStamp}-${imageName}`;
    }

    const uploadAndSendImage = async(imageURI) => {
        const uniqueRefString = generateReference(imageURI);
        const response = await fetch(imageURI);
        const blob = await response.blob();
        const newUploadRef = ref(storage, uniqueRefString);
        uploadBytes(newUploadRef, blob).then(async (snapshot) => {
        // console.log("File has been uploaded successfully");
        const imageURL = await getDownloadURL(snapshot.ref)
        onSend({ image: imageURL })
            })
    }
    
    return(
        <TouchableOpacity 
        style={StyleSheet.container} onPress={onActionPress}>
          <View style={[styles.wrapper, wrapperStyle]}>
            <Text style={[styles.iconText, iconTextStyle]}>+</Text>
          </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        width: 26,
        height: 26,
        marginLeft: 10,
        marginRight: 10
    },
    wrapper: {
        borderRadius: 13,
        borderColor: "#b2b2b2",
        borderWidth: 2,
        flex: 1
    },
    iconText: {
        color: "",
        fontWeight: "bold",
        fontSize: 10,
        backgroundColor: "transparent",
        textAlign: "center"
    }
})

export default CustomActions;