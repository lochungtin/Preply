import React from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';

import { SettingsType } from '../../types';

interface ReduxProps {
	settings: SettingsType,
}

class Calculator extends React.Component<ReduxProps> {
	render() {
		return (
			<View>
                
			</View>
		);
	}
}

const mapStateToProps = (state: ReduxProps) => ({
    settings: state.settings
});

export default connect(mapStateToProps)(Calculator);
