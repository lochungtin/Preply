import React from 'react';
import { View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { theme } from '../../data/colors';
import { RecordInputModalStyles } from './styles';

interface RowProps {
    children: any,
    iconName: string,
}

export default class InputRow extends React.Component<RowProps> {
    render() {
        return (
            <View style={RecordInputModalStyles.inputFieldRow}>
                <Icon
                    color={this.props.iconName === 'blank' ? 'transparent' : theme.textC}
                    name={this.props.iconName}
                    size={30}
                />
                <View style={RecordInputModalStyles.inputContainer}>
                    {this.props.children}
                </View>
            </View>
        );
    }
}
