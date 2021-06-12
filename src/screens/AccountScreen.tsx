import { DrawerNavigationProp } from '@react-navigation/drawer';
import React from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';

import Header from '../Components/Header';

import { theme } from '../data/colors';
import { ScreenStyles } from './styles';

interface NavProps {
	navigation: DrawerNavigationProp<any, any>,
}

interface ReduxProps {

}

class Screen extends React.Component<NavProps & ReduxProps> {
	render() {

		return (
			<View style={{ ...ScreenStyles.screenD, backgroundColor: theme.backgroundC }}>
				<Header nav={this.props.navigation} title={"Accounts"} />
			</View>
		);
	}
}

const mapStateToProps = (state: ReduxProps) => ({

});

export default connect(mapStateToProps)(Screen);
