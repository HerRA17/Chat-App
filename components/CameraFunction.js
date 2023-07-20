import React, {useState, useEffect, useRef} from "react";
import { StyleSheet, Text, View, Image, Button } from "react-native";
import { Camera, CameraType } from "expo-camera";
import * as MediaLibrary from "expo-media-library";
import ButtonsCamera from "./ButtonsCamera";
    // variables for the camera expo
    const CameraFunction = ({ }) =>{

    const [hasCameraPermission, setHasCameraPermission] = useState(null);
    const [image, setImage] = useState(null);
    const [type, setType] = useState(Camera.Constants.Type.Back);
    const [flash, setFlash] = useState(Camera.Constants.FlashMode);
    const cameraRef = useRef(null);

    useEffect(() => {
        (async () => {
        MediaLibrary.requestCameraPermissionsAsync();
        const cameraStatus = await Camera.requestCameraPermissionsAsync();
        setHasCameraPermission.cameraStatus.status === "granted";
        }) ();
    }, [])

    const takePicture = async () => {
        if (cameraRef) {
            try {
                const data = await cameraRef.current.takePictureAsync();
                console.log(data);
                setImage(data.uri);
            }
            catch(e) {
                console.log(e);
            }
        }
    } 

    const saveImage = async () => {
        try {
            await MediaLibrary.createAssetAsync(image);
            alert("Picture saved!")
            setImage(null);
        } catch (e) {
            console.log(e);
        }
    }

    if (hasCameraPermission === false) {
        return <Text>No Access to camera</Text>
    }

    

     return ( 
        <View>
        {!image ? 
            <Camera
            style={styles.camera} type={type} flashMode={flash} ref={cameraRef}>
            <View style={{
                flexDirection: "row",
                justifyContent: "space-between",
                paddingHorizontal: 30,
            }} >
                <Button icon="retweet" onPress={() => {setType(type === CameraType.back ? CameraType.front : CameraType.back)}} />
                <Button icon="flash"
                color={flash === Camera.Constants.FlashMode.off ? "gray" : "white"}
                onPress={() => {setFlash( flash === Camera.Constants.FlashMode.off ? Camera.Constants.FlashMode.on :
                Camera.Constants.FlashMode.off)}} />
            </View>
            </Camera>
            :
            <Image source={{uri: image}} style={styles.camera}/>
            }
            <View 
            style={{ 
                flexDirection: "row",
                jutifyContent: "space-between",
                paddingHorizontal: 50,
            }}>
            {image ? 
                <View>
                    <Button title="Re-take" icon="retweet" onPress={() => setImage(null)} />
                    <Button title="Save" icon="check" onPress={saveImage} />
                </View>
             : <ButtonsCamera title="Take a Picture" icon="camera" onPress={takePicture}/>
             } 
             </View>
        </View>
        )
    }
    const styles = StyleSheet.create({
        camera: {
            flex: 1,
            borderRadius: 15,
        }
    })
    export default CameraFunction;