import { Dimensions, StyleSheet } from "react-native";

export const screenWidth = Dimensions.get('screen').width;

export const AccountItemSeparatorStyle = StyleSheet.create({
    rootContainer: {
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: 20,
        width: screenWidth * 0.8,
    },
    text: {
        fontSize: 17,
    },
});
