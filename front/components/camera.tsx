import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Camera, CameraType } from 'expo-camera';
import * as FileSystem from 'expo-file-system';
import axios from 'axios';

export default function CameraView() {

  const [hasCameraPermission, setHasCameraPermission] = useState<boolean | null>(null);
  const [camera, setCamera] = useState<Camera | null>(null);
  const [image, setImage] = useState<string | null>(null);
  const [type, setType] = useState<CameraType>(CameraType.back);
  const [labels, setLabels] = useState<any[]>([]);

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
      getPrediction(data.uri);}
  };

  if (hasCameraPermission === false) {
    return <Text>No access to camera</Text>;
  }



  const getPrediction = async (uri : string) => {
    if (!uri) {
      return;
    }
    try {
      // 
      const apiKey = process.env.GOOGLE_CLOUD_VISION_API_KEY;
      const apiUrl = process.env.GOOGLE_CLOUD_VISION_API_IMAGE_ANNOTATION_URL + `?key=${apiKey}`;

      const base64ImageData = await FileSystem.readAsStringAsync(uri, { 
        encoding: FileSystem.EncodingType.Base64 
      });

      const body = {
        requests: [
          {
            image: {
              content: base64ImageData,
            },
            features: [
              {
                type: 'LABEL_DETECTION',
                maxResults: 10,
              },
            ],
          },
        ],
      };

      const response = await axios.post(apiUrl, body);
      setLabels(response.data.responses[0].labelAnnotations);

    } catch (error) {
      console.error(error);
      alert('An error occurred while processing the image');
    }

  }

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
      <Text>
        Image content: {labels.map((label) => label.description).join(', ')}
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