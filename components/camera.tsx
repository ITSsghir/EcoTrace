import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, View, Button, Image, TouchableOpacity, ImageStyle } from 'react-native';
import { Camera, CameraType } from 'expo-camera';
import icons from '@constants/icons';

export default function CameraView() {

  const [hasCameraPermission, setHasCameraPermission] = useState<boolean | null>(null);
  const [camera, setCamera] = useState<Camera | null>(null);
  const [image, setImage] = useState<string | null>(null);
  const [type, setType] = useState<CameraType>(CameraType.back);

  useEffect(() => {
    (async () => {
      const cameraStatus = await Camera.requestCameraPermissionsAsync();
      setHasCameraPermission(cameraStatus.status === 'granted');
    })();
  }, []);

  const takePicture = async () => {
    if (camera) {
      const data = await camera.takePictureAsync();
      setImage(data.uri);
    }
  };

  if (hasCameraPermission === false) {
    return <Text>No access to camera</Text>;
  }

  const saveAndSendPicture = async () => {
    if (image) {
      // Save the image as a file
      
      // TODO: Create some way to save the image to the device, temporarily or permanently using the uri from the image state
      
      const response = await fetch('https://example.com/upload', {
        method: 'POST',
        body: "", // TODO: Send the image file here
      });
      if (response.ok) {
        console.log('Image uploaded');
      } else {
        console.error('Failed to upload image');
      }
    }
  }

  const dimension = 40;
  const imgStyle: ImageStyle = {
    width: dimension,
    height: dimension,
    borderRadius: 10 / 1.25,
  };
  return (
    <View style={{ flex: 1 }}>
      <View style={styles.cameraContainer}>
        <Camera
          ref={(ref) => setCamera(ref as Camera)}
          style={styles.fixedRatio}
          type={type === 'back' ? CameraType.back : CameraType.front}
          ratio={'1:1'}
        />
      </View>
      <TouchableOpacity style={{ backgroundColor: 'blue', padding: 10, borderRadius: 5, alignContent: 'center', justifyContent: 'center', alignItems: 'center', borderColor: 'black', borderWidth: 1, margin: 10}}
        onPress={() => {
          setType(
            type === CameraType.back ? CameraType.front : CameraType.back
          );
        }}
      >
        <Text>Flip Camera</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => takePicture()} style={{ backgroundColor: 'blue', padding: 10, borderRadius: 5, alignContent: 'center', justifyContent: 'center', alignItems: 'center', borderColor: 'black', borderWidth: 1, margin: 10}}>
        <Text>Take Picture</Text>
      </TouchableOpacity>
      <Image source={icons.camera} style={imgStyle} />
      <Text>
        Image:
        {image && <Image source={{ uri: image }} style={{ flex: 1 }} />}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  cameraContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  fixedRatio: {
    flex: 1,
    aspectRatio: 1,
  },
});