import { Dimensions, StyleSheet } from 'react-native';

const screenWidth = Dimensions.get('screen').width;

export const HeaderStyles = StyleSheet.create({
    rootContainer: {
        alignItems: 'center',
        borderRadius: 15,
        display: 'flex',
        flexDirection: 'row',
        height: 50,
        justifyContent: 'space-around',
        marginTop: 10,
        marginBottom: 10,
        width: screenWidth * 0.95,
    },
    title: {
        fontSize: 20, 
        width: screenWidth * 0.7
    },
});
