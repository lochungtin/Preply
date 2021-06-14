import React from 'react';
import { Text, TouchableOpacity } from 'react-native';

import { theme } from '../../data/colors';
import { ConfirmBtnStyles } from './styles';

interface BtnProps {
    onPress: () => void,
    text: string,
}

export default class ConfirmBtn extends React.Component<BtnProps> {
    render() {
        return (
            <TouchableOpacity onPress={this.props.onPress} style={{ ...ConfirmBtnStyles.rootContainer, borderColor: theme.accent }}>
                <Text style={{ color: theme.textC }}>
                    Sync Now
                </Text>
            </TouchableOpacity>
        );
    }
}