import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Camera, CameraType } from 'expo-camera';
import * as FileSystem from 'expo-file-system';

export default function CameraView() {

  // Get the API key from the environment variables
  const apiKey = process.env.EXPO_PUBLIC_API_KEY;
  const apiUrl = process.env.EXPO_PUBLIC_API_URL + apiKey;

  const [hasCameraPermission, setHasCameraPermission] = useState<boolean | null>(null);
  const [camera, setCamera] = useState<Camera | null>(null);
  const [image, setImage] = useState<string | null>(null);
  const [type, setType] = useState<CameraType>(CameraType.back);
  const [labels, setLabels] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async () => {
      const cameraStatus = await Camera.requestCameraPermissionsAsync();
      setHasCameraPermission(cameraStatus.status === 'granted');
      setLoading(false);
      console.log('API key:', apiKey);
      console.log('API URL:', apiUrl);
    })();
  }, []);

  const takePicture = async () => {
    setLoading(true);
    if (camera) {
      const data = await camera.takePictureAsync();
      setImage(data.uri);
      getPrediction(image);
    }
  };

  if (hasCameraPermission === false) {
    return <Text>No access to camera</Text>;
  }



  const getPrediction = async (uri : string) => {
    if (!uri) {
      return;
    }
    try {
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
                maxResults: 20,
              },
            ],
          },
        ],
      };
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });
      let responseJson = await response.json();
      console.log(responseJson);
      // Print response as a string
      console.log(JSON.stringify(responseJson));
      console.log(JSON.stringify(responseJson.responses));
      setLabels(responseJson.responses[0].labelAnnotations[0].description);
      // End loading
      setLoading(false);

    } catch (error) {
      console.log(error);
    }
  };

  return ( {loading} ?
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
        Image content: {labels}
      </Text>
    </View>
    : <Text>Loading...</Text>
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