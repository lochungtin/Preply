import { Dimensions, StyleSheet, } from 'react-native';

export const screenWidth = Dimensions.get('screen').width;

export const CalendarStyles = StyleSheet.create({
    rootContainer: {
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'column',
        height: 300,
        justifyContent: 'center',
        width: 350,
    },
    tableContainer: {
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'column',
        height: 300,
        justifyContent: 'center',
        width: 350,
    },
    rowContainer: {
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'row',
        height: 50,
        justifyContent: 'space-between',
        width: 350,
    },
    btnContainer: {
        alignItems: 'center',
        display: 'flex',
        height: 50,
        justifyContent: 'center',
        width: 50,
    },
    btnText: {

    }
});
