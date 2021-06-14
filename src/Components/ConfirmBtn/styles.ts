import { Dimensions, StyleSheet } from "react-native";

const screenWidth = Dimensions.get('screen').width;

export const ConfirmBtnStyles = StyleSheet.create({
    rootContainer: {
        alignItems: 'center',
        borderRadius: 15,
        borderWidth: 2,
        display: 'flex',
        height: 40,
        justifyContent: 'center',
        width: screenWidth * 0.7,
    },
});
