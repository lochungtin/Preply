import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { theme } from '../../data/colors';
import { RecordItemStyles } from './styles';

export default class RecordItem extends React.Component {
    render() {
        return (
            <TouchableOpacity style={{ ...RecordItemStyles.rootContainer, backgroundColor: theme.recordBgC }}>
                <View style={{ ...RecordItemStyles.colorIndicator, backgroundColor: theme.accent }} />
                <Text style={{ ...RecordItemStyles.titleText, color: theme.textC }}>
                    Some Text
                </Text>
                <TouchableOpacity style={RecordItemStyles.checkbox}>
                    <Icon
                        color={theme.recordBtnC}
                        name='check-circle-outline'
                        size={35}
                    />
                </TouchableOpacity>
            </TouchableOpacity>
        );
    }
}
