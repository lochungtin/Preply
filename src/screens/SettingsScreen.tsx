import React from 'react';
import { Switch, View } from 'react-native';
import { connect } from 'react-redux';
import { darkModeColorScheme, lightModeColorScheme, } from '../data/colors';
import { setSettings } from '../redux/action';
import { store } from '../redux/store';

import { SettingsType } from '../types';

interface ReduxProps {
	settings: SettingsType,
}

class Screen extends React.Component<ReduxProps> {
	render() {
		return (
			<View>
				<Switch
					value={this.props.settings.darkMode}
					onValueChange={value => store.dispatch(setSettings({
						...this.props.settings, 
						darkMode: value, 
						colorScheme: value ? darkModeColorScheme : lightModeColorScheme
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
