import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Dimensions } from 'react-native';
import { Camera, CameraType } from 'expo-camera';
import * as FileSystem from 'expo-file-system';
import { router } from 'expo-router';

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
  const [tookPicture, setTookPicture] = useState(false);

  useEffect(() => {
    (async () => {
      const cameraStatus = await Camera.requestCameraPermissionsAsync();
      setHasCameraPermission(cameraStatus.status === 'granted');
      console.log('Camera permission:', cameraStatus.status);
      console.log('Camera loaded');
    })();
  }, []);

  const takePicture = async () => {
    setLoading(true);
    if (camera) {
      const data = await camera.takePictureAsync();
      setImage(data.uri);
      setTookPicture(true);
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

  return ( <>
      <View style={styles.cameraContainer}>
        <Camera
          ref={(ref) => setCamera(ref as Camera)}
          style={styles.fixedRatio}
          type={type === 'back' ? CameraType.back : CameraType.front}
        />
      </View>
      <View style={styles.cameraTriggers}>
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
      </View>
      <View style={styles.prediction_preview}>
        <TouchableOpacity style={{ backgroundColor: 'blue', padding: 10, borderRadius: 5, alignContent: 'center', justifyContent: 'center', alignItems: 'center', borderColor: 'black', borderWidth: 1, margin: 10}}
            onPress={() => {
              if (tookPicture) {
                router.push({ pathname: '/camera/[image]', params: { image } });
              }
              router.push('/camera/[image]');
            }
          }
        >
          <Text>Preview Picture</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{ backgroundColor: 'blue', padding: 10, borderRadius: 5, alignContent: 'center', justifyContent: 'center', alignItems: 'center', borderColor: 'black', borderWidth: 1, margin: 10}}
          onPress={() => getPrediction(image)}
        >
          <Text>Get predictions</Text>
        </TouchableOpacity>
      </View>
    </>
  );
}

const height = Dimensions.get('window').height;
const cameraHeight = height * 0.7;
const styles = StyleSheet.create({
  cameraContainer: {
    flex: 1,
    flexDirection: 'row',
    height: cameraHeight,
  },
  fixedRatio: {
    flex: 1,
    aspectRatio: 3 / 4,
  },
  cameraTriggers: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '150%',
  },
  prediction_preview: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
});