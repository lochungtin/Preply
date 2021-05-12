import React from 'react';
import { Dimensions, Text, View } from 'react-native';
import { connect } from 'react-redux';

import { NumpadConfigType, SettingsType, } from '../../types';
import { compute, isOp, isPa, tokenize, validate, } from '../../utils/rpn';
import SeparatorLine from '../SeparatorLine';
import NumpadBtn from './NumpadBtn';

import { calculatorStyles } from './styles';

interface ReduxProps {
	settings: SettingsType,
}

class Calculator extends React.Component<ReduxProps> {

	state = {
		equation: '',
		memory: 0,
		result: '',
	}

	onPressBackspace = () => this.setState({ equation: this.state.equation.slice(0, -1) });

	onPressClear = () => this.setState({ equation: '', memory: [], result: '' });

	onPressDecimal = () => {
		let equation: string = this.state.equation;
		let lastChar: string = equation[equation.length - 1];

		if (isOp(lastChar) || isPa(lastChar))
			equation += '0.';
		else
			equation += '.';

		this.setState({ equation });
	}

	onPressEval = () => {
		let tokenized: Array<string> = tokenize(this.state.equation);
		if (validate(tokenized)) {
			let res: number = compute(tokenized);
			this.setState({ equation: '', result: res, memory: res.toFixed(3) });
		}
	}

	onPressMem = () => {
		let equation: string = this.state.equation;
		if (equation[equation.length - 1] === ')')
			equation += `*${this.state.memory}`;
		else
			equation += this.state.memory;

		this.setState({ equation });
	}

	onPressNumeric = (num: number) => {
		let equation: string = this.state.equation;
		if (equation[equation.length - 1] === ')')
			equation += `*${num}`;
		else
			equation += num;

		this.setState({ equation });
	}

	onPressOperator = (op: string) => {
		let equation: string = this.state.equation;
		let lastChar: string = equation[equation.length - 1];
		if (equation === '')
			equation += '!';
		else if (isOp(lastChar))
			if (op === '-')
				equation += '!';
			else
				equation = equation.slice(0, -1) + op;
		else if (lastChar === '(') {
			if (op === '-')
				equation += '!';
		}
		else
			equation += op;

		this.setState({ equation });
	}

	onPressParentheses = () => {
		let equation: string = this.state.equation;
		let lastChar: string = equation[equation.length - 1];
		let valid: boolean = validate(tokenize(equation));

		// empty
		if (equation.length === 0)
			this.setState({ equation: '(' });
		// directly after operator
		else if (isOp(lastChar) || isPa(lastChar)) {
			// directly after close parenthesis
			if (lastChar === ")") {
				if (valid)
					this.setState({ equation: equation + '*(' });
				else
					this.setState({ equation: equation + ')' });
			}
			// directly after operator or open parenthesis
			else
				this.setState({ equation: equation + '(' });
		}
		// directly after number
		else {
			if (valid)
				this.setState({ equation: equation + '*(' });
			else
				this.setState({ equation: equation + ')' });
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
					<Text style={{ ...calculatorStyles.equation, color: this.props.settings.colorScheme.textC }}>
						{this.state.equation.replace(/!/g, '-')}
					</Text>
				</View>
				<View style={calculatorStyles.resultContainer}>
					<Text style={{ ...calculatorStyles.result, color: this.props.settings.colorScheme.textC }}>
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
