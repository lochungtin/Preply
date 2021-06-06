import React from 'react';
import { Text, View, } from 'react-native';

import { theme } from '../../data/colors';
import { TagStyles } from './styles';

interface TagProps {
    color: string,
    name: string,
    width?: number,
}

export default class Screen extends React.Component< TagProps> {
    render() {
        return (
            <View style={{ ...TagStyles.rootContainer, borderColor: this.props.color, width: this.props.width }}>
                <View style={{ ...TagStyles.dot, backgroundColor: this.props.color }} />
                <Text style={{ ...TagStyles.text, color: theme.textC }}>
                    {this.props.name}
                </Text>
            </View>
        );
    }
}
