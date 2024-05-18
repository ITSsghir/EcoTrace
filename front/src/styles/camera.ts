import { Dimensions, StyleSheet } from 'react-native';
import Colors from '@/constants/Colors'

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
const cameraHeight = height * 0.7;

const PreviewStyles = StyleSheet.create({
    container: {
        flex: 1,
    },
    Imagecontainer : {
        flex: 1,
        height: cameraHeight,
    },
    button: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
        margin: 10,
        borderRadius: 10,
        backgroundColor: Colors.white,
    },
    fixedRatio: {
        flex: 1,
        aspectRatio: 3 / 4,
    },
    icon: {
        width: 30,
        height: 30,
        marginRight: 10,
    },
    subTitle: {
        fontSize: 12
    },
    imagePreview: {
        width: width,
        height: height * 0.7,
    }
});

const CameraStyles = StyleSheet.create({
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
    },
    button: { 
        backgroundColor: Colors.green,
        padding: 10,
        borderRadius: 5,
        alignContent: 'center', 
        justifyContent: 'center',
        borderColor: 'black', 
        textAlign: 'center',
        borderWidth: 1, 
        margin: 10
    }
});

export default { PreviewStyles, CameraStyles };