import { DrawerNavigationProp } from '@react-navigation/drawer';
import React from 'react';
import { TouchableOpacity, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import AccountTextInput from '../Components/AccountTextInput';
import Logo from '../Components/Logo';

import { theme } from '../data/colors';
import { AccountScreenStyles, ScreenStyles } from './styles';

import { signIn } from '../firebase/auth';

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
				<TouchableOpacity style={{ ...AccountScreenStyles.confirmBtn, borderColor: theme.accent }}>
					<Text style={{ color: theme.textC }}>
						Sign Up Now
					</Text>
				</TouchableOpacity>
			</View>
		);
	}
}
