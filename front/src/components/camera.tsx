import React from 'react';
import { Text, View, TouchableOpacity, SafeAreaView } from 'react-native';
import { Camera, CameraType } from 'expo-camera/legacy';
import { useRouter } from 'expo-router';
import styles from '@/styles/camera';

export default function CameraView() {

  const [hasCameraPermission, setHasCameraPermission] = React.useState<boolean | null>(null);
  const [camera, setCamera] = React.useState<Camera | null>(null);
  const [image, setImage] = React.useState<string | null>(null);
  const [type, setType] = React.useState<CameraType>(CameraType.back);

  const router = useRouter();

  React.useEffect(() => {
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
      <View style={styles.CameraStyles.cameraContainer}>
        <Camera
          ref={(ref) => setCamera(ref as Camera)}
          style={styles.CameraStyles.fixedRatio}
          type={type === 'back' ? CameraType.back : CameraType.front}
        />
      </View>
      <View style={styles.CameraStyles.cameraTriggers}>
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