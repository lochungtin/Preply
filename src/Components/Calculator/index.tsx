import React from 'react';
import { Dimensions, Text, View } from 'react-native';
import { connect } from 'react-redux';

import { NumpadConfigType, SettingsType, } from '../../types';
import { compute, isOp, validate, } from '../../utils/rpn';
import SeparatorLine from '../SeparatorLine';
import NumpadBtn from './NumpadBtn';

import { calculatorStyles } from './styles';

interface ReduxProps {
	settings: SettingsType,
}

class Calculator extends React.Component<ReduxProps> {

	state = {
		equation: [""],
		memory: [],
		result: "",
	}

	onPressBackspace = () => {
		let equation: Array<string> = [...this.state.equation];
		equation.splice(equation.length - 1, 1);
		this.setState({ equation });
	}

	onPressClear = () => this.setState({ equation: [], result: 0 });

	onPressDecimal = () => {
		let equation: Array<string> = this.state.equation;
		let lastIndex: number = equation.length - 1;
		if (equation[lastIndex] === "")
			equation[lastIndex] = "0.";
		else
			equation[lastIndex] += ".";

		this.setState({ equation });
	}

	onPressEval = () => {
		if (validate(this.state.equation))
			this.setState({ result: compute(this.state.equation) });
	}

	onPressMem = () => { }

	onPressNumeric = (num: number) => {
		let equation: Array<string> = this.state.equation;
		equation[equation.length - 1] += num.toString();
		this.setState({ equation });
	}

	onPressOperator = (op: string) => this.setState({ equation: [...this.state.equation, op, ""] });

	onPressParentheses = () => {
		let equation: Array<string> = this.state.equation;
		let lastIndex: number = equation.length - 1;

		// empty
		if (equation[0] === '')
			this.setState({ equation: ['('] });
		// directly after number
		else if (!isNaN(parseFloat(equation[lastIndex]))) {
			if (validate(equation))
				this.setState({ equation: [...equation, ")", ""] });
			else
				this.setState({ equation: [...equation, "*", "(", ""] });
		}
		// directly after operator
		else {
			equation.splice(lastIndex, 1);
			let op: string = equation[lastIndex - 1];
			// directly after operator or open parenthesis
			if (isOp(op) || op === "(")
				this.setState({ equation: [...equation, "(", ""] });
			// directly after close parenthesis
			else {
				if (validate(equation))
					this.setState({ equation: [...equation, ")", ""] });
				else
					this.setState({ equation: [...equation, "*", "(", ""] });
			}
		}
	}

	render() {
		const keypos: Array<Array<NumpadConfigType>> = [
			[
				{ name: 'alpha-m', onPress: this.onPressMem },
				{ name: 'code-parentheses', onPress: this.onPressParentheses },
				{ name: 'alpha-c', onPress: this.onPressClear },
				{ name: 'keyboard-backspace', onPress: this.onPressBackspace },
			],
			[
				{ name: 'numeric-7', onPress: () => this.onPressNumeric(7) },
				{ name: 'numeric-8', onPress: () => this.onPressNumeric(8) },
				{ name: 'numeric-9', onPress: () => this.onPressNumeric(9) },
				{ name: 'division-box', onPress: () => this.onPressOperator('/') },
			],
			[
				{ name: 'numeric-4', onPress: () => this.onPressNumeric(4) },
				{ name: 'numeric-5', onPress: () => this.onPressNumeric(5) },
				{ name: 'numeric-6', onPress: () => this.onPressNumeric(6) },
				{ name: 'multiplication-box', onPress: () => this.onPressOperator('*') },
			],
			[
				{ name: 'numeric-1', onPress: () => this.onPressNumeric(1) },
				{ name: 'numeric-2', onPress: () => this.onPressNumeric(2) },
				{ name: 'numeric-3', onPress: () => this.onPressNumeric(3) },
				{ name: 'minus-box', onPress: () => this.onPressOperator('-') },
			],
			[
				{ name: 'circle-small', onPress: this.onPressDecimal },
				{ name: 'numeric-0', onPress: () => this.onPressNumeric(0) },
				{ name: 'equal-box', onPress: this.onPressEval },
				{ name: 'plus-box', onPress: () => this.onPressOperator('+') },
			],
		];

		return (
			<View style={calculatorStyles.rootContainer}>
				<View style={calculatorStyles.equationContainer}>
					<Text style={{...calculatorStyles.equation, color: this.props.settings.colorScheme.textC}}>
						{this.state.equation}
					</Text>
				</View>
				<View style={calculatorStyles.resultContainer}>
					<Text style={{...calculatorStyles.result, color: this.props.settings.colorScheme.textC}}>
						{this.state.result}
					</Text>
				</View>
				<SeparatorLine width={Dimensions.get('screen').width * 0.9} />
				<View style={calculatorStyles.numpadContainer}>
					{keypos.map((row, index) => {
						return (
							<View key={index} style={calculatorStyles.rowContainer}>
								{row.map(key => <NumpadBtn {...key} key={key.name} />)}
							</View>
						);
					})}
				</View>
			</View>
		);
	}
}

const mapStateToProps = (state: ReduxProps) => ({
	settings: state.settings
});

export default connect(mapStateToProps)(Calculator);
