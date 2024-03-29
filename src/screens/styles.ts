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

export const AccountScreenStyles = StyleSheet.create({
    logoWrapper: {
        margin: 20,
    },
    forgotPswdContainer: {
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-end',
        marginBottom: 40,
        width: screenWidth * 0.7,
    },
    signUpTextContainer: {
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 100,
        width: screenWidth * 0.6,
    },
    header: {
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: 20,
        width: screenWidth * 0.9,
    },
    signUpLabel: {
        fontSize: 22,
    },
    resetPromptText: {
        marginVertical: 25,
        textAlign: 'justify',
        width: screenWidth * 0.6,
    },
    syncMethodContainer: {
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: screenWidth * 0.7,
    },
    syncMethodLabel: {
        fontSize: 16,
        width: screenWidth * 0.6,
    },
    syncMethodText: {
        fontSize: 16,
        textAlign: 'center',
        width: screenWidth * 0.45,
    },
    syncMethodBtn: {
        alignItems: 'center',
        borderRadius: 15,
        borderWidth: 2,
        display: 'flex',
        height: 40,
        justifyContent: 'center',
        width: screenWidth * 0.2,
    }
});

export const CalculatorScreenStyles = StyleSheet.create({
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

export const ConverterScreenStyles = StyleSheet.create({
    typeBubble: {
        alignItems: 'center',
        borderRadius: 15,
        borderWidth: 2,
        display: 'flex',
        height: 40,
        justifyContent: 'center',
        width: screenWidth * 0.8,
    },
    selectionText: {
        textAlign: 'center',
        minWidth: 25,
    },
    selectionLabel: {
        fontSize: 17,
    },
    inputRows: {
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        marginTop: 30,
    },
    inputRow: {
        alignItems: 'center',
        borderBottomWidth: 2,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 15,
        padding: 10,
        paddingLeft: 20,
        width: screenWidth * 0.8,
    },
    unitBubble: {
        alignItems: 'center',
        borderRadius: 15,
        borderWidth: 2,
        display: 'flex',
        height: 40,
        justifyContent: 'center',
        width: 65,
    },
    valueText: {
        fontSize: 22,
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
    textInput: {
        flex: 1,
        marginVertical: 10,
        padding: 0,
        textAlignVertical: 'top',
        width: screenWidth * 0.9,
    },
});
