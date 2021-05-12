import { Dimensions, StyleSheet, } from 'react-native';

export const screenWidth = Dimensions.get('screen').width;

export const screenStyles = StyleSheet.create({
    screenD: {
        alignItems: 'center',
        display: 'flex',
        flex: 1
    }
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
