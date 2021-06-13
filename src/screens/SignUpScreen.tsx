import { DrawerNavigationProp } from '@react-navigation/drawer';
import React from 'react';
import { TouchableOpacity, Text, View } from 'react-native';
import { showMessage } from 'react-native-flash-message';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import AccountTextInput from '../Components/AccountTextInput';
import Logo from '../Components/Logo';

import { theme } from '../data/colors';
import { AccountScreenStyles, ScreenStyles } from './styles';

import { signUp } from '../firebase/auth';
import { signInRedux } from '../redux/action';
import { store } from '../redux/store';

interface NavProps {
	navigation: DrawerNavigationProp<any, any>,
}

export default class Screen extends React.Component<NavProps> {

	state = {
		email: '',
		pswd: '',
		rPswd: '',
	}

	signUp = () => {
		if (!this.state.email)
			return showMessage({
				backgroundColor: theme.modalBgC,
				color: theme.accent,
				message: `An email is required `,
			});

		if (!this.state.pswd)
			return showMessage({
				backgroundColor: theme.modalBgC,
				color: theme.accent,
				message: `A password is required `,
			});

		if (this.state.pswd !== this.state.rPswd)
			return showMessage({
				backgroundColor: theme.modalBgC,
				color: theme.accent,
				message: `Passwords don't match`,
			});

		signUp(this.state.email, this.state.pswd)
			.then(res => {
				store.dispatch(signInRedux({
					email: res.user?.email || '',
					uid: res.user?.uid || '',
					useGoogle: false,
				}));
				showMessage({
					backgroundColor: theme.accent,
					color: theme.modalBgC,
					message: 'Sign Up Successful - Auto logged in',
				});
			})
			.catch(err => {
				let message: string;

				switch (err.code) {
					case 'auth/invalid-email':
						message = 'Invalid Email'
						break;
					case 'auth/weak-password':
						message = 'Password must have 6+ characters'
						break;
					case 'auth/email-already-in-use':
						message = 'Email already in use, try logging in'
						break;
					default:
						message = err.toString();
				}

				showMessage({
					message,
					backgroundColor: theme.accent,
					color: theme.modalBgC,
				});
			});
	}

	render() {
		return (
			<View style={{ ...ScreenStyles.screenD, backgroundColor: theme.backgroundC }}>
				<View style={AccountScreenStyles.header}>
					<TouchableOpacity onPress={() => this.props.navigation.goBack()}>
						<Icon
							color={theme.textC}
							name='chevron-left'
							size={40}
						/>
					</TouchableOpacity>
					<Text style={{ ...AccountScreenStyles.signUpLabel, color: theme.textC }}>
						Sign Up
					</Text>
					<Icon
						color='transparent'
						name='blank'
						size={40}
					/>
				</View>
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
				<AccountTextInput
					hidden
					onChangeText={rPswd => this.setState({ rPswd })}
					placeholder='Reenter password'
				/>
				<View style={{ height: 100 }} />
				<TouchableOpacity onPress={this.signUp} style={{ ...AccountScreenStyles.confirmBtn, borderColor: theme.accent }}>
					<Text style={{ color: theme.textC }}>
						Sign Up Now
					</Text>
				</TouchableOpacity>
			</View>
		);
	}
}
