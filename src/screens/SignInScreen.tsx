import { DrawerNavigationProp } from '@react-navigation/drawer';
import React from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';

import Header from '../Components/Header';

import { ScreenStyles } from './styles';

import { SettingsType } from '../types';

interface NavProps {
	navigation: DrawerNavigationProp<any, any>,
}

interface ReduxProps {
	settings: SettingsType,
}

class Screen extends React.Component<NavProps & ReduxProps> {
	render() {
		return (
			<View style={{...ScreenStyles.screenD, backgroundColor: this.props.settings.colorScheme.backgroundC}}>
				<Header nav={this.props.navigation} title={'Sign In'} />
			</View>
		);
	}
}

const mapStateToProps = (state: ReduxProps) => ({
    settings: state.settings
});

export default connect(mapStateToProps)(Screen);
