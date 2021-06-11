import React from 'react';
import { TouchableOpacity, Text } from 'react-native';

import { theme } from '../../data/colors';
import { ClockStyles } from './styles';

interface ClockBtnProps {
    onPress: (rt: string) => void,
    selected: boolean,
    size: number,
    text: string,
}

export default class ClockBtn extends React.Component<ClockBtnProps> {
    render() {
        return (
            <TouchableOpacity onPress={() => this.props.onPress(this.props.text)} style={{ height: this.props.size, width: this.props.size }}>
                <Text style={{ ...ClockStyles.text, color: theme.textC, fontSize: this.props.size * 2 / 3, width: this.props.size }}>
                    {this.props.text}
                </Text>
            </TouchableOpacity>
        );
    }
}
