import { DrawerNavigationProp } from '@react-navigation/drawer';
import React from 'react';
import { TouchableOpacity, Text, View } from 'react-native';
import { showMessage } from 'react-native-flash-message';

import AccountTextInput from '../components/AccountTextInput';
import Header from '../components/Header';
import Logo from '../components/Logo';

import { theme } from '../data/colors';
import { AccountScreenStyles, ScreenStyles } from './styles';

import { signUp } from '../firebase/auth';
import { firebaseOverwriteUserData } from '../firebase/data';
import { signInRedux } from '../redux/action';
import { store } from '../redux/store';
import { NoteMap, TodoMap } from '../types';
import { connect } from 'react-redux';

interface NavProps {
	navigation: DrawerNavigationProp<any, any>,
}

interface ReduxProps {
	notes: NoteMap,
	todos: TodoMap,

}

class Screen extends React.Component<NavProps & ReduxProps> {

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
					message: 'Sign up successful, auto logged in',
				});

				firebaseOverwriteUserData(res.user?.uid || '', {
					notes: this.props.notes,
					todos: this.props.todos,
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
				<Header backMode nav={this.props.navigation} title='Sign Up' />
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

const mapStateToProps = (state: ReduxProps) => ({
	notes: state.notes,
	todos: state.todos,
});

export default connect(mapStateToProps)(Screen);
