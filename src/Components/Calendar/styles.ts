import { Dimensions, StyleSheet, } from 'react-native';

export const screenWidth = Dimensions.get('screen').width;

export const CalendarStyles = StyleSheet.create({
    rootContainer: {
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'column',
        height: 400,
        justifyContent: 'flex-start',
        width: 350,
    },
    navContainer: {
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'row',
        height: 50,
        justifyContent: 'space-between',
        width: 350,
    },
    monthLabel: {
        fontSize: 17
    },
    tableContainer: {
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'column',
        height: 350,
        justifyContent: 'flex-start',
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
        borderRadius: 10,
        display: 'flex',
        height: 40,
        justifyContent: 'center',
        width: 40,
    },
    btnText: {

    }
});
