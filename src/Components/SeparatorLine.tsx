import React from 'react';
import { View } from 'react-native';

import { theme } from '../data/colors';

interface BarProps {
	width: number,
	style?: any,
}

export default class SeparatorLine extends React.Component<BarProps> {
	render() {
		return (
			<View 
				style={{
					...this.props.style,
					backgroundColor: theme.separatorLineC,
					height: 2,
					width: this.props.width,
				}}
			/>
		);
	}
}