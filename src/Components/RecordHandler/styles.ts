import { Dimensions, StyleSheet, } from 'react-native';

const screenWidth = Dimensions.get('screen').width;

export const RecordHandlerStyles = StyleSheet.create({
    rootContainer: {
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'row',
        height: 40,
        justifyContent: 'space-around',
        width: screenWidth * 0.9,
    },
    addRecordContainer: {
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: screenWidth * 0.5,
    },
    addRecordText: {
        fontSize: 17,
        width: screenWidth * 0.4, 
    },
});
