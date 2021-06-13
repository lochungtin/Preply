import { DrawerNavigationProp } from '@react-navigation/drawer';
import React from 'react';
import { TouchableOpacity, Text, View } from 'react-native';
import { connect } from 'react-redux';

import Header from '../components/Header';

import { theme } from '../data/colors';
import { signOutRedux } from '../redux/action';
import { store } from '../redux/store';
import { ScreenStyles } from './styles';

interface NavProps {
	navigation: DrawerNavigationProp<any, any>,
}

interface ReduxProps {

}

class Screen extends React.Component<NavProps & ReduxProps> {

	signOut = () => {
		store.dispatch(signOutRedux())
	}

	render() {
		return (
			<View style={{ ...ScreenStyles.screenD, backgroundColor: theme.backgroundC }}>
				<Header nav={this.props.navigation} title={"Account"} />
				<TouchableOpacity onPress={this.signOut}>
					<Text style={{ color: theme.textC }}>
						Sign Out
					</Text>
				</TouchableOpacity>
			</View>
		);
	}
}

const mapStateToProps = (state: ReduxProps) => ({

});

export default connect(mapStateToProps)(Screen);
