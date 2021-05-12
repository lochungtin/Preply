import React from 'react';
import { TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { connect } from 'react-redux';

import { calculatorStyles } from './styles';

import { NumpadConfigType, SettingsType } from '../../types';

interface ReduxProps {
	settings: SettingsType,
}

class NumpadBtn extends React.Component<ReduxProps & NumpadConfigType> {
	render() {
		return (
			<TouchableOpacity
				onPress={this.props.onPress}
				style={calculatorStyles.cellContainer}
			>
                <Icon
					color={this.props.settings.colorScheme.textC}
					name={this.props.name}
					size={40}
				/>
			</TouchableOpacity>
		);
	}
}

const mapStateToProps = (state: ReduxProps) => ({
    settings: state.settings
});

export default connect(mapStateToProps)(NumpadBtn);
