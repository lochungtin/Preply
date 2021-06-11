import React from 'react';
import { TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { theme } from '../../data/colors';
import { CalculatorStyles } from './styles';

import { NumpadConfigType } from '../../types';

interface NumpadProps {
	color: string,
}

export default class NumpadBtn extends React.Component<NumpadConfigType & NumpadProps> {
	render() {
		return (
			<TouchableOpacity
				onPress={this.props.onPress}
				style={CalculatorStyles.cellContainer}
			>
                <Icon
					color={this.props.color}
					name={this.props.name}
					size={40}
				/>
			</TouchableOpacity>
		);
	}
}
