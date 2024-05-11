import { Dimensions, StyleSheet } from 'react-native';


const screenWidth = Dimensions.get('window').width;
const choicesContainerWidth = screenWidth * 0.9;
const choiceButtonWidth = choicesContainerWidth / 4 - 10;
const choiceIconWidth = choiceButtonWidth * 0.5;
const choiceTitleFontSize = screenWidth < 400 ? 12 : 14;

const styles = StyleSheet.create({
    choicesContainer: {
        flex: 1,
        borderRadius: 10 / 1.25,
        width: choicesContainerWidth,
        height: choiceButtonWidth * 2 + 20,
        margin: 10
    },
    subTitle: {
        fontSize: choiceTitleFontSize,
    },
    button: {
        width: choiceButtonWidth,
        height: choiceButtonWidth,
        borderRadius: 10 / 1.25,
        borderWidth:  1,
        borderColor: 'black',
        margin: 5,
        padding: 10,
    },
    icon: {
        width: choiceIconWidth,
        height: choiceIconWidth,
        borderRadius: 10 / 1.25,
        margin: 10
    }
});

export default styles;