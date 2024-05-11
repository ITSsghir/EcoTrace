import { Dimensions, StyleSheet } from 'react-native';

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
        backgroundColor: '#f0f0f0',
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
    }
});

export default { PreviewStyles, CameraStyles };