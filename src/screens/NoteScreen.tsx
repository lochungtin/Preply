import React from 'react';
import { View, } from 'react-native';
import { connect } from 'react-redux';

import { SettingsType, TodoType, } from '../types';

import { screenStyles } from './styles';

interface ReduxProps {
    notes: Array<TodoType>,
	settings: SettingsType
}

class AppNav extends React.Component<ReduxProps> {
	render() {
		return (
			<View style={{...screenStyles.screenD, backgroundColor: this.props.settings.colorScheme.backgroundC}}>

			</View>
		);
	}
}

const mapStateToProps = (state: ReduxProps) => ({
    notes: state.notes,
});

export default connect(mapStateToProps)(AppNav);
