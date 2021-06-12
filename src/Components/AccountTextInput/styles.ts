import { Dimensions, StyleSheet } from 'react-native';

export const screenWidth = Dimensions.get('screen').width;

export const AccountTextInputStyles = StyleSheet.create({
    rootContainer: {
        alignItems: 'center',
        borderBottomWidth: 2,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10,
        paddingHorizontal: 10,
        paddingVertical: 2.5,
        width: screenWidth * 0.7,
    },
    textInput: {
        width: screenWidth * 0.5,
    },
});
