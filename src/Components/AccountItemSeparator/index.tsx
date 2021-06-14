import React from 'react';
import { Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import SeparatorLine from '../SeparatorLine';

import { theme } from '../../data/colors';
import { AccountItemSeparatorStyle, screenWidth } from './styles';

interface SeparatorProps {
    iconName: string,
    text: string,
}

export default class AccountItemSeparator extends React.Component<SeparatorProps> {

    state = {
        textWidth: 0,
    }

    render() {
        return (
            <View style={AccountItemSeparatorStyle.rootContainer}>
                <Icon 
                    color={theme.accent}
                    name={this.props.iconName}
                    size={30}
                />
                <Text onLayout={layout => this.setState({ textWidth: layout.nativeEvent.layout.width })} style={{ ...AccountItemSeparatorStyle.text, color: theme.textC }}>
                    {this.props.text}
                </Text>
                <SeparatorLine width={(screenWidth * 0.8 - 60 - this.state.textWidth)} />
            </View>
        );
    }
}