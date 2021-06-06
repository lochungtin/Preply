import React from 'react';
import { TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { theme } from '../../data/colors';

interface HandlerProps {
    active: boolean,
    iconName: string,
    onPress: () => void,
}

export default class HandlerBtn extends React.Component<HandlerProps> {
    render() {
        return (
            <TouchableOpacity onPress={this.props.onPress}>
                <Icon
                    color={this.props.active ? theme.accent : theme.textC}
                    name={this.props.iconName}
                    size={25}
                />
            </TouchableOpacity>
        );
    }
}
