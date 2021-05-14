import { DrawerNavigationProp } from '@react-navigation/drawer';
import React from 'react';
import { Switch, View } from 'react-native';
import { connect } from 'react-redux';

import Header from '../Components/Header';
import { setSettings } from '../redux/action';
import { store } from '../redux/store';

import { SettingsType } from '../types';

import { darkModeColorScheme, lightModeColorScheme, } from '../data/colors';
import { screenStyles } from './styles';

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
				<Header nav={this.props.navigation} title={"Settings"} />
				<Switch
					value={this.props.settings.darkMode}
					onValueChange={value => store.dispatch(setSettings({
						...this.props.settings, 
						darkMode: value, 
						colorScheme: value ? darkModeColorScheme : lightModeColorScheme,
					}))}
				/>
			</View>
		);
	}
}

const mapStateToProps = (state: ReduxProps) => ({
    settings: state.settings
});

export default connect(mapStateToProps)(Screen);
