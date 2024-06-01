import { StyleSheet, Dimensions } from 'react-native';
import Colors from '@/constants/Colors'

const screenWidth = Dimensions.get('window').width;
const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        justifyContent: "center",
        flex: 1,
        backgroundColor: Colors.primary,
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
    },
    miniTitle: {
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 20,
        paddingVertical: 20,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    sidebar: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        width: 4/6 * screenWidth,
        backgroundColor: Colors.white,
        zIndex: 6,
        padding: 20,
    },
    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Adjust opacity as needed
        zIndex: 5, // Render behind the sidebar
    },
    choicesContainer: { 
        flex: 1, 
        justifyContent: 'center', 
        alignItems: 'center' 
    },
    sidebarItem: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        flexDirection: 'column',
        alignItems: 'stretch',
    },
    sidebarItemClicked: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        flexDirection: 'column',
        alignItems: 'stretch',
        backgroundColor: '#f0f0f0',
        borderRadius: 5,
    },
    sidebarItemMini: {
        padding: 10,
        flexDirection: 'column',
        alignItems: 'stretch',
        borderBlockColor: '#ccc',

    },
    sidebarItemText: {
        fontSize: 16,
        fontWeight: '500',
    },
    sidebarItemTextMini: {
        fontSize: 14,
        fontWeight: '400',
    },
    sidebarDropdown: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        flexDirection: 'column',
        alignItems: 'stretch',
    },
});

export default styles;