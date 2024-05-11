import { StyleSheet, Dimensions } from "react-native";

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    bigContainer: {
        flex: 1,
        marginTop: height /2 - 75,
    },
    title: {
        fontSize: 24,
        marginBottom: 16,
        marginRight: width * 0.1,
        marginLeft: width * 0.1,
    },
    btn:{
        backgroundColor: 'blue',
        color: 'white',
        padding: 10,
        marginRight: width * 0.1,
        marginLeft: width * 0.1,
        marginTop: 10,
        marginBottom: 10,
        width: width * 0.8,
        borderRadius: 5,
    },
    btnText: {
        color: 'white'
    }
});

export default styles;