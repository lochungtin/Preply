import React from 'react';
import { TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { theme } from '../../data/colors';
import { CalculatorStyles } from './styles';

import { NumpadConfigType } from '../../types';

export default class NumpadBtn extends React.Component<NumpadConfigType> {
	render() {
		return (
			<TouchableOpacity
				onPress={this.props.onPress}
				style={CalculatorStyles.cellContainer}
			>
                <Icon
					color={theme.textC}
					name={this.props.name}
					size={40}
				/>
			</TouchableOpacity>
		);
	}
}
