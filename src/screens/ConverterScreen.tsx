import { DrawerNavigationProp } from '@react-navigation/drawer';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

import Calculator from '../Components/Calculator';
import Header from '../Components/Header';
import MultiSelectModal from '../Components/MultiSelectModal';
import SeparatorLine from '../Components/SeparatorLine';

import { theme } from '../data/colors';
import { distanceMatrix, temperatureMatrix, weightMatrix } from '../data/units';
import { UnitMatrixType } from '../types';
import { CalculatorScreenStyles, ConverterScreenStyles, ScreenStyles, screenWidth } from './styles';

interface NavProps {
	navigation: DrawerNavigationProp<any, any>,
}

export default class Screen extends React.Component<NavProps> {

	state = {
		from: distanceMatrix.default.from,
		input: 0,
		openFromPicker: false,
		openToPicker: false,
		openTypePicker: false,
		output: 0,
		to: distanceMatrix.default.to,
		type: 0,
	}

	types: Array<UnitMatrixType> = [distanceMatrix, temperatureMatrix, weightMatrix];

	onChangeType = (type: number) => this.setState({
		type,
		from: this.types[type].default.from,
		input: 0,
		output: 0,
		openTypePicker: false,
		to: this.types[type].default.to,
	});

	onClear = () => this.setState({ result: 0 });

	onResult = (input: number) => this.setState({ input });

	render() {
		return (
			<View style={{ ...ScreenStyles.screenD, backgroundColor: theme.backgroundC }}>
				<Header nav={this.props.navigation} title={"Unit Converter"} />
				<View style={CalculatorScreenStyles.rootContainer}>
					<View style={CalculatorScreenStyles.displayContainer}>
						<View>
							<MultiSelectModal
								items={this.types.map((type, index) => {
									return (
										<Text style={{ ...ConverterScreenStyles.selectionText, color: this.state.type === index ? theme.accent : theme.textC }}>
											{type.typeName}
										</Text>
									);
								})}
								onClose={() => this.setState({ openTypePicker: false })}
								onItemPress={this.onChangeType}
								open={this.state.openTypePicker}
								selected={this.state.type}
							>
								<TouchableOpacity onPress={() => this.setState({ openTypePicker: true })}>
									<Text style={{ ...ConverterScreenStyles.selectionLabel, color: theme.textC }}>
										{this.types[this.state.type].typeName}
									</Text>
								</TouchableOpacity>
							</MultiSelectModal>
						</View>
						<View>
							<View>
								<MultiSelectModal
									items={this.types[this.state.type].labels.map((label, index) => {
										return (
											<Text style={{ ...ConverterScreenStyles.selectionText, color: this.state.from === index ? theme.accent : theme.textC }}>
												{label}
											</Text>
										);
									})}
									onClose={() => this.setState({ openFromPicker: false })}
									onItemPress={from => this.setState({ from, openFromPicker: false })}
									open={this.state.openFromPicker}
									selected={this.state.from}
								>
									<TouchableOpacity onPress={() => this.setState({ openFromPicker: true })}>
										<Text style={{ ...ConverterScreenStyles.selectionLabel, color: theme.textC }}>
											{this.types[this.state.type].labels[this.state.from]}
										</Text>
									</TouchableOpacity>
								</MultiSelectModal>
							</View>
							<View>
								<MultiSelectModal
									items={this.types[this.state.type].labels.map((label, index) => {
										return (
											<Text style={{ ...ConverterScreenStyles.selectionText, color: this.state.to === index ? theme.accent : theme.textC }}>
												{label}
											</Text>
										);
									})}
									onClose={() => this.setState({ openToPicker: false })}
									onItemPress={to => this.setState({ to, openToPicker: false })}
									open={this.state.openToPicker}
									selected={this.state.to}
								>
									<TouchableOpacity onPress={() => this.setState({ openToPicker: true })}>
										<Text style={{ ...ConverterScreenStyles.selectionLabel, color: theme.textC }}>
											{this.types[this.state.type].labels[this.state.to]}
										</Text>
									</TouchableOpacity>
								</MultiSelectModal>
							</View>
						</View>
						<SeparatorLine width={screenWidth * 0.9} />
					</View>
					<Calculator
						disable
						onClear={this.onClear}
						onResult={this.onResult}
						onUpdate={eq => { }}
					/>
				</View>
			</View>
		);
	}
}
