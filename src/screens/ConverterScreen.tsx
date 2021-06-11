import { DrawerNavigationProp } from '@react-navigation/drawer';
import React from 'react';
import { View } from 'react-native';

import Calculator from '../Components/Calculator';
import Header from '../Components/Header';
import SeparatorLine from '../Components/SeparatorLine';

import { theme } from '../data/colors';
import { calculatorScreenStyles, ScreenStyles } from './styles';

interface NavProps {
	navigation: DrawerNavigationProp<any, any>,
}

export default class Screen extends React.Component<NavProps> {

	state = {
		from: '',
		input: 0,
		output: 0,
		to: '',
		type: ','
	}

	onClear = () => this.setState({ equation: '', result: '' });

	onResult = (result: number) => this.setState({ result });

	render() {
		return (
			<View style={{ ...ScreenStyles.screenD, backgroundColor: theme.backgroundC }}>
				<Header nav={this.props.navigation} title={"Unit Converter"} />
				<View style={calculatorScreenStyles.rootContainer}>
					<View style={calculatorScreenStyles.displayContainer}>
						
					</View>
					<Calculator
						onClear={this.onClear}
						onResult={this.onResult}
						onUpdate={eq => {}}
					/>
				</View>
			</View>
		);
	}
}
