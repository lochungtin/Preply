import { DrawerNavigationProp } from '@react-navigation/drawer';
import React from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';

import Header from '../Components/Header';

import { screenStyles } from './styles';

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
			<View style={{...screenStyles.screenD, backgroundColor: this.props.settings.colorScheme.backgroundC}}>
				<Header nav={this.props.navigation} title={'Sign Up'} />
			</View>
		);
	}
}

const mapStateToProps = (state: ReduxProps) => ({
    settings: state.settings
});

export default connect(mapStateToProps)(Screen);
