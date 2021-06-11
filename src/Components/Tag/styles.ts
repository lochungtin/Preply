import { Dimensions, StyleSheet } from 'react-native';

export const screenWidth = Dimensions.get('screen').width;

export const TagStyles = StyleSheet.create({
    rootContainer: {
        alignItems: 'center',
        borderWidth: 2,
        borderRadius: 20,
        display: 'flex',
        flexDirection: 'row',
        height: 30,
        justifyContent: 'space-between',
        paddingHorizontal: 8,
    },
    dot: {
        borderRadius: 9,
        height: 18,
        width: 18,
    },
    text: {
        marginLeft: 10,
    },
});
