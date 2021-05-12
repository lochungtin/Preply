import { Dimensions, StyleSheet, } from 'react-native';

const screenWidth = Dimensions.get('screen').width;

export const calculatorStyles = StyleSheet.create({
    cellContainer: {
        alignItems: 'center',
        display: 'flex',
        flex: 1,
        justifyContent: 'center',
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
        height: '15%',
        marginBottom: 20,
        marginTop: 5,
        width: screenWidth * 0.9
    },
    numpadContainer: {
        height: '50%',
        marginBottom: 20,
        width: screenWidth * 0.95,
    },
    result: {
        fontSize: 30,
        paddingHorizontal: 15,
        textAlign: 'right',
        width: screenWidth * 0.9,
    },
    resultContainer: {
        alignItems: 'center',
        height: '12%',
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
    rowContainer: {
        alignItems: 'center',
        display: 'flex',
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
    },
});
