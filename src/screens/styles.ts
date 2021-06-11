import { Dimensions, StyleSheet } from 'react-native';

export const screenWidth = Dimensions.get('screen').width;

export const ScreenStyles = StyleSheet.create({
    screenD: {
        alignItems: 'center',
        display: 'flex',
        flex: 1
    },
    scrollView: {
        alignItems: 'center',
        width: screenWidth,
    },
});

export const calculatorScreenStyles = StyleSheet.create({
    displayContainer: {
        alignItems: 'center',
        display: 'flex',
        height: '45%',
        flexDirection: 'column',
        justifyContent: 'space-between',
    },
    equation: {
        fontSize: 40,
        paddingHorizontal: 15,
        textAlign: 'right',
        width: screenWidth * 0.9,
    },
    equationContainer: {
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'row',
        minHeight: '15%',
        marginBottom: 20,
        marginTop: 5,
        width: screenWidth * 0.9
    },
    result: {
        fontSize: 30,
        paddingHorizontal: 15,
        textAlign: 'right',
        width: screenWidth * 0.9,
    },
    resultContainer: {
        alignItems: 'center',
        minHeight: '12%',
        display: 'flex',
        flexDirection: 'row',
        marginBottom: 20,
        marginTop: 20,
        width: screenWidth * 0.9
    },
    rootContainer: {
        alignItems: 'center',
        display: 'flex',
        flex: 1,
        justifyContent: 'space-between',
    },
});

export const NoteScreenStyles = StyleSheet.create({
    titleRow: {
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'row',
        height: 60,
        justifyContent: 'space-between',
        marginTop: 20,
        width: screenWidth * 0.9,
    },
    titleInput: {
        fontSize: 25,
        width: screenWidth * 0.6
    },
    infoRow: {
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'row',
        height: 50,
        justifyContent: 'space-between',
        width: screenWidth * 0.9,
    },
    dateText: {
        fontSize: 15,
    },
    textInput: {
        flex: 1,
        fontSize: 15,
        marginVertical: 10,
        padding: 0,
        textAlignVertical: 'top',
        width: screenWidth * 0.9,
    },
});
