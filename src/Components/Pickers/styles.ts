import { Dimensions, StyleSheet, } from 'react-native';

export const screenWidth = Dimensions.get('screen').width;

export const PickerStyles = StyleSheet.create({
    rootContainer: {
        alignItems: 'center',
        borderRadius: 10,
        display: 'flex',
        flexDirection: 'column',
        height: 420,
        justifyContent: 'center',
        width: 375,
    },
});
