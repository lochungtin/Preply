import { DrawerNavigationProp } from '@react-navigation/drawer';
import React from 'react';
import { TouchableOpacity, Text, View } from 'react-native';

import AccountTextInput from '../Components/AccountTextInput';
import Header from '../Components/Header';
import Logo from '../Components/Logo';

import { theme } from '../data/colors';
import { AccountScreenStyles, ScreenStyles } from './styles';

import { resetPswd } from '../firebase/auth';
import { showMessage } from 'react-native-flash-message';

interface NavProps {
    navigation: DrawerNavigationProp<any, any>,
}

export default class Screen extends React.Component<NavProps> {

    state = {
        email: '',
    }

    resetPswd = () => {
        if (!this.state.email)
            return showMessage({
                backgroundColor: theme.modalBgC,
                color: theme.accent,
                message: 'Enter email to reset password'
            });

        resetPswd(this.state.email)
            .then(() => showMessage({
                backgroundColor: theme.accent,
                color: theme.modalBgC,
                message: 'Reset password email sent',
            }))
            .catch(err => {
                let message: string;

                switch (err.code) {
                    case 'auth/user-not-found':
                        message = 'No accounts registered under this email'
                        break;
                    default:
                        message = err.toString();
                        break;
                }

                showMessage({
                    message,
                    backgroundColor: theme.modalBgC,
                    color: theme.accent,
                });
            });
    }

    render() {
        return (
            <View style={{ ...ScreenStyles.screenD, backgroundColor: theme.backgroundC }}>
                <Header backMode nav={this.props.navigation} title='Reset Password' />
                <View style={AccountScreenStyles.logoWrapper}>
                    <Logo size={200} />
                </View>
                <Text style={{ ...AccountScreenStyles.resetPromptText, color: theme.dTextC }}>
                    Looks like someone forget their password. Type your email below to reset your password.
                </Text>
                <AccountTextInput
                    onChangeText={email => this.setState({ email })}
                    placeholder='Email'
                />
                <View style={{ height: 50 }} />
                <TouchableOpacity onPress={this.resetPswd} style={{ ...AccountScreenStyles.confirmBtn, borderColor: theme.accent }}>
                    <Text style={{ color: theme.textC }}>
                        Reset Password
                    </Text>
                </TouchableOpacity>
            </View>
        );
    }
}
