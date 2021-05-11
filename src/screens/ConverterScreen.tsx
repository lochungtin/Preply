import React from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';

import { SettingsType } from '../types';

import { screenStyles } from './styles';

interface ReduxProps {
	settings: SettingsType,
}

class Screen extends React.Component<ReduxProps> {
	render() {
		return (
			<View style={{...screenStyles.screenD, backgroundColor: this.props.settings.colorScheme.backgroundC}}>

			</View>
		);
	}
}

const mapStateToProps = (state: ReduxProps) => ({
    settings: state.settings
});

export default connect(mapStateToProps)(Screen);
