import { StyleSheet, Dimensions } from 'react-native';
import Colors from '@/constants/Colors'

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.white,
        margin: 10,
        borderRadius: 10 / 1.25,
        padding: 10,
        width: screenWidth - 20
    },
    historyContainer: {
        flex: 1,
    },
    homeContainer: {
        backgroundColor: Colors.primary,
        borderRadius: 10 / 1.25,
        width: screenWidth * 0.9,
        padding: 0,
        margin: 10,
        height: screenHeight * 0.9,
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        margin: 15,
        marginBottom: 20
    },
    subTitle: {
        fontSize: 18,
    },
    btnContainer: {
        borderRadius: 10 / 1.25,
        justifyContent: "center",
        alignItems: "center",
    },
    subSubTitle: {
        fontSize: 14,
        fontWeight: "bold",
        textAlign: "right"
    },
    activity: { 
        flex: 1, 
        justifyContent: 'space-between', 
        margin: 20, 
        borderColor: Colors.black,
        borderBottomWidth: 2, 
        paddingBottom: 10, 
        marginTop: 5 
    },
    filterBlock: {
        flexDirection: 'row',
        paddingVertical: 10,
        backgroundColor: Colors.primary,
    },
    noActivitiesTitle: {
        fontSize: 20,
        textAlign: 'center',
        marginTop: screenHeight / 3,
    },
    icon: {
        width: 20,
        height: 20,
        borderRadius: 10 / 1.25,
        marginTop: 18 * 0.125 * screenHeight / 100,
        marginRight: -1 * screenWidth / 100,
        marginLeft: 1 * screenWidth / 100,

    },
    titleContainer: {
        flexDirection: 'row',
        display: 'flex',
    },
});

export default styles;