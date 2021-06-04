import React from 'react';
import { TouchableOpacity, Text, } from 'react-native';
import { connect } from 'react-redux';

import { ClockStyles } from './styles';

import { SettingsType } from '../../types';

interface ReduxProps {
    settings: SettingsType,
}

interface ClockBtnProps {
    onPress: (rt: string) => void,
    selected: boolean,
    size: number,
    text: string,
}

class ClockBtn extends React.Component<ReduxProps & ClockBtnProps> {
    render() {
        return (
            <TouchableOpacity onPress={() => this.props.onPress(this.props.text)} style={{ height: this.props.size, width: this.props.size }}>
                <Text style={{ ...ClockStyles.text,color: this.props.settings.colorScheme.textC, fontSize: this.props.size * 2 / 3, width: this.props.size, }}>
                    {this.props.text}
                </Text>
            </TouchableOpacity>
        );
    }
}

const mapStateToProps = (state: ReduxProps) => ({
    settings: state.settings
});

export default connect(mapStateToProps)(ClockBtn);
