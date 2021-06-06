import { Dimensions, StyleSheet, } from 'react-native';

export const screenWidth = Dimensions.get('screen').width;

export const PickerStyles = StyleSheet.create({
    modalStyle: {
        alignItems: 'center',
        display: 'flex',
    },
    rootContainer: {
        alignItems: 'center',
        borderRadius: 10,
        display: 'flex',
        flexDirection: 'column',
        height: 420,
        justifyContent: 'center',
        width: 375,
    },
    centerControlContainer: {
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'column',
        height: 130,
        justifyContent: 'space-between',
    },
    timePickerLabelContainer: {
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'row',
        height: 60,
        justifyContent: 'space-between',
        width: 130,
    },
    timePickerLabel: {
        fontSize: 40,
        textAlign: 'center',
    },
    timePickerSwitchContainer: {
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'row',
        height: 60,
        justifyContent: 'space-between',
        width: 160,
    },
    timePickerSwitchLabel: {
        fontSize: 20,
    },
});
