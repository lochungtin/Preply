import { DrawerNavigationProp } from '@react-navigation/drawer';
import React from 'react';
import { TouchableOpacity, Text, View } from 'react-native';
import { showMessage } from 'react-native-flash-message';

import AccountTextInput from '../components/AccountTextInput';
import ConfirmBtn from '../components/ConfirmBtn';
import Header from '../components/Header';
import Logo from '../components/Logo';

import { theme } from '../data/colors';
import { AccountScreenStyles, ScreenStyles } from './styles';

import { signIn } from '../firebase/auth';
import { store } from '../redux/store';
import { signInRedux } from '../redux/action';

interface NavProps {
	navigation: DrawerNavigationProp<any, any>,
}

export default class Screen extends React.Component<NavProps> {

	state = {
		email: '',
		pswd: '',
	}

	signIn = () => {
		signIn(this.state.email, this.state.pswd)
			.then(res => {
				store.dispatch(signInRedux({
					email: res.user?.email || '',
					uid: res.user?.uid || '',
					useGoogle: false,
				}));
				showMessage({
					backgroundColor: theme.accent,
					color: theme.modalBgC,
					message: 'Login successful',
				});
			})
			.catch(err => {
				let message: string;

				switch (err.code) {
					case 'auth/invalid-email':
						message = 'Invalid email provided';
						break;
					case 'auth/wrong-password':
						message = 'Password entered is not correct';
						break;
					case 'auth/user-not-found':
						message = 'There is no account under this email address'
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
				<Header nav={this.props.navigation} title={"Sign In"} />
				<View style={AccountScreenStyles.logoWrapper}>
					<Logo size={200} />
				</View>

				<AccountTextInput
					onChangeText={email => this.setState({ email })}
					placeholder='Email'
				/>
				<AccountTextInput
					hidden
					onChangeText={pswd => this.setState({ pswd })}
					placeholder='Password'
				/>
				<View style={AccountScreenStyles.forgotPswdContainer}>
					<TouchableOpacity onPress={() => this.props.navigation.navigate('pswdReset')}>
						<Text style={{ color: theme.textC }}>
							Forgot Password?
						</Text>
					</TouchableOpacity>
				</View>
				<ConfirmBtn onPress={this.signIn} text='Sign In'/>

				<View style={AccountScreenStyles.signUpTextContainer}>
					<Text style={{ color: theme.textC }}>
						Don't have an account?
					</Text>
					<TouchableOpacity onPress={() => this.props.navigation.navigate('signUp')}>
						<Text style={{ color: theme.accent }}>
							Sign Up
						</Text>
					</TouchableOpacity>
				</View>
			</View>
		);
	}
}
