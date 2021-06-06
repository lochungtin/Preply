import { Dimensions, StyleSheet } from 'react-native';

const screenWidth = Dimensions.get('screen').width;

export const RecordItemStyles = StyleSheet.create({
    rootContainer: {
        alignItems: 'center',
        borderRadius: 10,
        display: 'flex',
        flexDirection: 'row',
        height: 60,
        justifyContent: 'space-between',
        marginVertical: 10,
        width: screenWidth * 0.9,
    },
    colorIndicator: {
        borderRadius: 10,
        height: 60,
        width: 10,
    },
    titleText: {
        fontSize: 17,
        width: screenWidth * 0.55
    },
    checkbox: {
        alignItems: 'center',
        display: 'flex',
        height: 60,
        justifyContent: 'center',
        width: 60,
    }
});