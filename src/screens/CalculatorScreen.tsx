import { DrawerNavigationProp } from '@react-navigation/drawer';
import React from 'react';
import { Text, View } from 'react-native';

import Calculator from '../Components/Calculator';
import Header from '../Components/Header';
import SeparatorLine from '../Components/SeparatorLine';

import { theme } from '../data/colors';
import { CalculatorScreenStyles, ScreenStyles, screenWidth } from './styles';

interface NavProps {
	navigation: DrawerNavigationProp<any, any>,
}

export default class Screen extends React.Component<NavProps> {

	state = {
		equation: '',
		result: '',
	}

	onClear = () => this.setState({ equation: '', result: '' });

	onResult = (result: number) => this.setState({ result });

	onUpdate = (equation: string) => this.setState({ equation });

	render() {
		return (
			<View style={{ ...ScreenStyles.screenD, backgroundColor: theme.backgroundC }}>
				<Header nav={this.props.navigation} title='Calculator' />
				<View style={CalculatorScreenStyles.rootContainer}>
					<View style={CalculatorScreenStyles.displayContainer}>
						<View style={CalculatorScreenStyles.equationContainer}>
							<Text style={{ ...CalculatorScreenStyles.equation, color: theme.textC }}>
								{this.state.equation.replace(/!/g, '-')}
							</Text>
						</View>
						<View style={CalculatorScreenStyles.resultContainer}>
							<Text style={{ ...CalculatorScreenStyles.result, color: theme.textC }}>
								{this.state.result}
							</Text>
						</View>
						<SeparatorLine width={screenWidth * 0.9} />
					</View>
					<Calculator
						onClear={this.onClear}
						onResult={this.onResult}
						onUpdate={this.onUpdate}
					/>
				</View>
			</View>
		);
	}
}
