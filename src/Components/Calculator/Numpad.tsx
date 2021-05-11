import React from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';

import { NumpadConfigType, SettingsType } from '../../types';
import NumpadBtn from './NumpadBtn';

interface ReduxProps {
    settings: SettingsType,
}

class Numpad extends React.Component<ReduxProps> {

    pressBackspace = () => {
        
    }

    pressClear = () => {

    }

    pressDecimal = () => {

    }

    pressEval = () => {

    }

    pressMemory = () => {

    }

    pressNumeric = (num: number) => {

    }

    pressOperator = (op: string) => {

    }

    pressParentheses = () => {

    }

    keypos: Array<Array<NumpadConfigType>> = [
        [
            { name: 'alpha-m', onPress: this.pressMemory },
            { name: 'code-parentheses', onPress: this.pressParentheses },
            { name: 'alpha-c', onPress: this.pressClear },
            { name: 'keyboard-backspace', onPress: this.pressBackspace },
        ],
        [
            { name: 'numeric-7', onPress: () => this.pressNumeric(7) },
            { name: 'numeric-8', onPress: () => this.pressNumeric(8) },
            { name: 'numeric-9', onPress: () => this.pressNumeric(9) },
            { name: 'multiplication-box', onPress: () => this.pressOperator('/') },
        ],
        [
            { name: 'numeric-4', onPress: () => this.pressNumeric(4) },
            { name: 'numeric-5', onPress: () => this.pressNumeric(5) },
            { name: 'numeric-6', onPress: () => this.pressNumeric(6) },
            { name: 'minus-box', onPress: () => this.pressOperator('*') },
        ],
        [
            { name: 'numeric-1', onPress: () => this.pressNumeric(1) },
            { name: 'numeric-2', onPress: () => this.pressNumeric(2) },
            { name: 'numeric-3', onPress: () => this.pressNumeric(3) },
            { name: 'plus-box', onPress: () => this.pressOperator('-') },
        ],
        [
            { name: 'circle-small', onPress: () => this.pressDecimal() },
            { name: 'numeric-0', onPress: () => this.pressNumeric(0) },
            { name: 'equal-box', onPress: () => this.pressEval() },
            { name: 'division-box', onPress: () => this.pressOperator('+') },
        ],
    ];

    render() {
        return (
            <View>
                {this.keypos.map(row => {
                    return (
                        <View>
                            {row.map(key => {
                                return (
                                    <NumpadBtn {...key}/>
                                );
                            })}
                        </View>
                    );
                })}
            </View>
        );
    }
}

const mapStateToProps = (state: ReduxProps) => ({
    settings: state.settings
});

export default connect(mapStateToProps)(Numpad);
