import { StyleSheet } from 'react-native';

export const calculatorStyles = StyleSheet.create({
    cellContainer: {
        alignItems: 'center',
        display: 'flex',
        flex: 1,
        justifyContent: 'center',
    },
    numpadContainer: {
        height: '55%',
    },
    rootContainer: {
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
