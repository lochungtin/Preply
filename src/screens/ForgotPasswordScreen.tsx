import { DrawerNavigationProp } from '@react-navigation/drawer';
import React from 'react';
import { TouchableOpacity, Text, View } from 'react-native';
import AccountTextInput from '../Components/AccountTextInput';

import Header from '../Components/Header';
import Logo from '../Components/Logo';

import { theme } from '../data/colors';
import { AccountScreenStyles, ScreenStyles, screenWidth } from './styles';

import { signIn } from '../firebase/auth';

interface NavProps {
    navigation: DrawerNavigationProp<any, any>,
}

export default class Screen extends React.Component<NavProps> {

    state = {
        email: '',
    }

    signIn = () => {
        signIn('lochungtin@gmail.com', 'killme').then(res => console.log(res.user?.email, res.user?.uid)).catch(err => console.log(err));
    }

    render() {
        return (
            <View style={{ ...ScreenStyles.screenD, backgroundColor: theme.backgroundC }}>
                <Header nav={this.props.navigation} title={"Sign In"} />
                <View style={AccountScreenStyles.logoWrapper}>
                    <Logo size={200} />
                </View>
                <AccountTextInput
                    onChangeText={email => this.setState({ email })}
                    placeholder='Email'
                />

                <TouchableOpacity style={{ ...AccountScreenStyles.signInBtn, borderColor: theme.accent }}>
                    <Text style={{ color: theme.textC }}>
                        Reset Password
                    </Text>
                </TouchableOpacity>
            </View>
        );
    }
}
