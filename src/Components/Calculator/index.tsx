import React from 'react';
import { View } from 'react-native';

import { compute, isOp, isPa, tokenize, validate } from '../../utils/rpn';
import NumpadBtn from './NumpadBtn';

import { CalculatorStyles } from './styles';

import { NumpadConfigType } from '../../types';
import { theme } from '../../data/colors';

interface FunctionProps {
	disable?: boolean,
	onClear: () => void,
	onResult: (result: number) => void,
	onUpdate: (equation: string) => void,
}

export default class Calculator extends React.Component<FunctionProps> {

	state = {
		equation: '',
		memory: 0,
		result: '',
	}

	onPressBackspace = () => {
		let equation: string = this.state.equation.slice(0, -1);
		this.setState({ equation });
		this.props.onUpdate(equation);
	}

	onPressClear = () => {
		this.setState({ equation: '', memory: 0, result: '' });
		this.props.onClear();
	}

	onPressDecimal = () => {
		let equation: string = this.state.equation;
		let lastChar: string = equation[equation.length - 1];

		if (isOp(lastChar) || isPa(lastChar))
			equation += '0.';
		else
			equation += '.';

		this.setState({ equation });
		this.props.onUpdate(equation);
	}

	onPressEval = () => {
		if (!this.props.disable) {
			let tokenized: Array<string> = tokenize(this.state.equation);
			if (validate(tokenized)) {
				let result: number = compute(tokenized);
				let memory = result.toString();
				if (memory.includes('.'))
					memory = result.toFixed(3);

				this.setState({ equation: '', result, memory });
				this.props.onUpdate('');
				this.props.onResult(result);
			}
		}
	}

	onPressMem = () => {
		if (!this.props.disable) {
			let equation: string = this.state.equation;
			let memory: string = this.state.memory.toString();
			memory = memory.replace('-', '!');

			if (equation[equation.length - 1] === ')')
				equation += `*${memory}`;
			else
				equation += memory;

			this.setState({ equation });
			this.props.onUpdate(equation);
		}
	}

	onPressNumeric = (num: number) => {
		let equation: string = this.state.equation;
		if (equation[equation.length - 1] === ')')
			equation += `*${num}`;
		else
			equation += num;

		this.setState({ equation });
		this.props.onUpdate(equation);
	}

	onPressOperator = (op: string) => {
		if (!this.props.disable) {
			let equation: string = this.state.equation;
			let lastChar: string = equation[equation.length - 1];
			if (equation === '') {
				if (op === '-')
					equation += '!';
			}
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
			this.props.onUpdate(equation);
		}
	}

	onPressParentheses = () => {
		if (!this.props.disable) {
			let equation: string = this.state.equation;
			let lastChar: string = equation[equation.length - 1];
			let valid: boolean = validate(tokenize(equation));

			// empty
			if (equation.length === 0)
				equation = '(';
			// directly after operator
			else if (isOp(lastChar) || isPa(lastChar)) {
				// directly after close parenthesis
				if (lastChar === ")")
					equation += (valid ? '*(' : ')');
				// directly after operator or open parenthesis
				else
					equation += '(';
			}
			// directly after number
			else
				equation += (valid ? '*(' : ')');

			this.setState({ equation });
			this.props.onUpdate(equation);
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
			<View style={CalculatorStyles.numpadContainer}>
				{keypos.map((row, index) => {
					return (
						<View key={index} style={CalculatorStyles.rowContainer}>
							{row.map(key => {
								let color: string = theme.textC;;

								if (this.props.disable) {
									switch (true) {
										case key.name.startsWith('num'):
										case key.name.startsWith('key'):
										case key.name.startsWith('cir'):
										case key.name.endsWith('a-c'):
											color = theme.textC;
											break;
										default:
											color = theme.dTextC;
									}
								}

								return (
									<NumpadBtn {...key} color={color} key={key.name} />
								);
							})}
						</View>
					);
				})}
			</View>
		);
	}
}
