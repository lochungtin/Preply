import { DrawerNavigationProp } from '@react-navigation/drawer';
import React from 'react';
import { TextInput, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { theme } from '../../data/colors';

import { AccountTextInputStyles } from './styles';

interface InputProps {
    hidden?: boolean,
    onChangeText: (text: string) => void,
    placeholder: string,
}

export default class AccountTextInput extends React.Component<InputProps> {

    state = {
        hidden: true,
    }

    toggleHidden = () => {
        if (this.props.hidden)
            this.setState({ hidden: !this.state.hidden });
    }

    render() {
        return (
            <View style={{ ...AccountTextInputStyles.rootContainer, borderColor: theme.separatorLineC }}>
                <TextInput
                    autoCapitalize={'none'}
                    onChangeText={this.props.onChangeText}
                    placeholder={this.props.placeholder}
                    placeholderTextColor={theme.dTextC}
                    secureTextEntry={this.props.hidden && this.state.hidden}
                    style={{ ...AccountTextInputStyles.textInput, color: theme.textC }}
                />
                <TouchableOpacity onPress={this.toggleHidden}>
                    <Icon
                        color={this.props.hidden ? theme.textC : 'transparent'}
                        name={this.state.hidden ? 'eye' : 'eye-off'}
                        size={25}
                    />
                </TouchableOpacity>
            </View>
        );
    }
}
