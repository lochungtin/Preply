import { Dimensions, StyleSheet, } from 'react-native';

export const screenWidth = Dimensions.get('screen').width;

export const calculatorStyles = StyleSheet.create({
    cellContainer: {
        alignItems: 'center',
        display: 'flex',
        flex: 1,
        justifyContent: 'center',
    },
    numpadContainer: {
        height: '50%',
        marginBottom: 20,
        width: screenWidth * 0.95,
    },
    rowContainer: {
        alignItems: 'center',
        display: 'flex',
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
    },
});
