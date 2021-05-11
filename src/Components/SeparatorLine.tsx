import React from 'react';
import { View, } from 'react-native';
import { connect } from 'react-redux';

import { SettingsType } from '../types';

interface ReduxProps {
    settings: SettingsType
}

interface BarProps {
	width: number,
}

class SeparatorLine extends React.Component<ReduxProps & BarProps> {
	render() {
		return (
			<View 
				style={{
					backgroundColor: this.props.settings.colorScheme.separatorLineC,
					height: 2,
					width: this.props.width,
				}}
			/>
		);
	}
}

const mapStateToProps = (state: ReduxProps) => ({
    settings: state.settings
});

export default connect(mapStateToProps)(SeparatorLine);