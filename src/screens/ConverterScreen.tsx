import { DrawerNavigationProp } from '@react-navigation/drawer';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

import Calculator from '../Components/Calculator';
import Header from '../Components/Header';
import MultiSelectModal from '../Components/MultiSelectModal';
import SeparatorLine from '../Components/SeparatorLine';

import { theme } from '../data/colors';
import { calculatorScreenStyles, ScreenStyles, screenWidth } from './styles';

interface NavProps {
	navigation: DrawerNavigationProp<any, any>,
}

export default class Screen extends React.Component<NavProps> {

	state = {
		from: 0,
		input: 0,
		openFromPicker: false,
		openToPicker: false,
		openTypePicker: false,
		output: 0,
		to: 0,
		type: 0,
	}

	onClear = () => this.setState({ result: 0 });

	onResult = (input: number) => this.setState({ input });

	render() {

		let types = ['Distance', 'Temperature', 'Weight'];

		return (
			<View style={{ ...ScreenStyles.screenD, backgroundColor: theme.backgroundC }}>
				<Header nav={this.props.navigation} title={"Unit Converter"} />
				<View style={calculatorScreenStyles.rootContainer}>
					<View style={calculatorScreenStyles.displayContainer}>
						<View>
							<MultiSelectModal
								items={types.map(type => {
									return (
										<View>
											<Text>
												{type}
											</Text>
										</View>
									);
								})}
								onClose={() => this.setState({ openTypePicker: false })}
								onItemPress={type => this.setState({ type, openTypePicker: false })}
								open={this.state.openTypePicker}
								selected={this.state.type}
							>
								<TouchableOpacity onPress={() => this.setState({ openTypePicker: true })}>
									<Text>
										{types[this.state.type]}
									</Text>
								</TouchableOpacity>
							</MultiSelectModal>
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
