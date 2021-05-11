import { Dimensions, StyleSheet, } from 'react-native';

const screenWidth = Dimensions.get('screen').width;

export const calculatorStyles = StyleSheet.create({
    cellContainer: {
        alignItems: 'center',
        display: 'flex',
        flex: 1,
        justifyContent: 'center',
    },
    equationContainer: {
        height: '12%',
        borderColor: '#FFF',
        borderWidth: 2,
        width: screenWidth * 0.9
    },
    numpadContainer: {
        height: '50%',
        width: screenWidth * 0.95,
    },
    resultContainer: {
        height: '12%',
        borderColor: '#FFF',
        borderWidth: 2,
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
