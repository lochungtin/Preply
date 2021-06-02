import { DrawerNavigationProp } from '@react-navigation/drawer';
import React from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';

import Calculator from '../Components/Calculator';
import Header from '../Components/Header';
import SeparatorLine from '../Components/SeparatorLine';

import { calculatorScreenStyles, ScreenStyles, screenWidth, } from './styles';

import { SettingsType } from '../types';

interface NavProps {
	navigation: DrawerNavigationProp<any, any>,
}

interface ReduxProps {
	settings: SettingsType,
}

class Screen extends React.Component<NavProps & ReduxProps> {

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
			<View style={{ ...ScreenStyles.screenD, backgroundColor: this.props.settings.colorScheme.backgroundC }}>
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

const mapStateToProps = (state: ReduxProps) => ({
	settings: state.settings
});

export default connect(mapStateToProps)(Screen);
