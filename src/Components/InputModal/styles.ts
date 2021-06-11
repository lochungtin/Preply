import { Dimensions, StyleSheet } from 'react-native';

export const screenWidth = Dimensions.get('screen').width;
const screenHeight = Dimensions.get('screen').height;

export const RecordInputModalStyles = StyleSheet.create({
    positioner: {
        alignItems: 'flex-end',
        display: 'flex',
        flexDirection: 'row',
        height: screenHeight,
        margin: 0,
        padding: 0,
        width: screenWidth,
    },
    rootContainer: {
        alignItems: 'center',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        display: 'flex',
        flexDirection: 'column',
        height: screenHeight * 0.7,
        justifyContent: 'flex-start',
        width: screenWidth,
    },
    closeBtn: {
        alignItems: 'center',
        display: 'flex',
        justifyContent: 'center',
        width: screenWidth * 0.8
    },
    inputFieldRow: {
        alignItems: 'flex-start',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        paddingLeft: 10,
        paddingVertical: 10,
        width: screenWidth,
    },
    titleTextInput: {
        fontSize: 30,
        padding: 0,
        width: screenWidth * 0.65
    },
    inputContainer: {
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'row',
        minHeight: 30,
        justifyContent: 'space-between',
        paddingRight: 10,
        width: screenWidth * 0.75
    },
    labelText: {
        fontSize: 17,
    },
    descriptionInput: {
        fontSize: 15,
        padding: 0,
    },
});
