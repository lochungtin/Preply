import { DrawerNavigationProp } from '@react-navigation/drawer';
import React from 'react';
import { Text, View } from 'react-native';

import Calculator from '../Components/Calculator';
import Header from '../Components/Header';
import SeparatorLine from '../Components/SeparatorLine';

import { theme } from '../data/colors';
import { calculatorScreenStyles, ScreenStyles, screenWidth } from './styles';

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
				<View style={calculatorScreenStyles.rootContainer}>
					<View style={calculatorScreenStyles.displayContainer}>
						<View style={calculatorScreenStyles.equationContainer}>
							<Text style={{ ...calculatorScreenStyles.equation, color: theme.textC }}>
								{this.state.equation.replace(/!/g, '-')}
							</Text>
						</View>
						<View style={calculatorScreenStyles.resultContainer}>
							<Text style={{ ...calculatorScreenStyles.result, color: theme.textC }}>
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
