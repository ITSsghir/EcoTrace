import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Dimensions, SafeAreaView } from 'react-native';
import { Camera, CameraType } from 'expo-camera/legacy';
import { useRouter } from 'expo-router';

export default function CameraView({ children }: { children?: React.ReactNode }) {

  // Get the API key from the environment variables
  const apiKey = process.env.EXPO_PUBLIC_API_KEY;
  const apiUrl = process.env.EXPO_PUBLIC_API_URL + apiKey;

  const [hasCameraPermission, setHasCameraPermission] = useState<boolean | null>(null);
  const [camera, setCamera] = useState<Camera | null>(null);
  const [image, setImage] = useState<string | null>(null);
  const [type, setType] = useState<CameraType>(CameraType.back);

  const router = useRouter();

  useEffect(() => {
    (async () => {
      const cameraStatus = await Camera.requestCameraPermissionsAsync();
      setHasCameraPermission(cameraStatus.status === 'granted');
      console.log('Camera permission:', cameraStatus.status);
      console.log('Camera loaded');
    })();
  }, []);

  const takePicture = async () => {
    if (camera) {
      const data = await camera.takePictureAsync();
      setImage(data.uri);
      router.push({ pathname: '/camera/[image]', params: { image: data.uri } });
    }
  };

  if (hasCameraPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return ( 
    <SafeAreaView style={{ flex: 1 }}>
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
        <TouchableOpacity onPress={async () => await takePicture()} style={{ backgroundColor: 'blue', padding: 10, borderRadius: 5, alignContent: 'center', justifyContent: 'center', alignItems: 'center', borderColor: 'black', borderWidth: 1, margin: 10}}>
          <Text>Take Picture</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
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
    aspectRatio: 3 / 4
  },
  cameraTriggers: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '150%',
  }
});