import { Dimensions, StyleSheet, } from 'react-native';

export const screenWidth = Dimensions.get('screen').width;

export const MSMStyles = StyleSheet.create({
    modalStyle: {
        alignItems: 'center',
        display: 'flex',
    },
    rootContainer: {
        alignItems: 'center',
        borderRadius: 10,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: 30,
    },
    itemContainer: {
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        margin: 10,
    },
    itemWrapper: {
        marginHorizontal: 10,
    }
});
