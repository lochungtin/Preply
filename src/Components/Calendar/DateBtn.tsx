import React from 'react';
import { Text, TouchableOpacity, } from 'react-native';
import { connect } from 'react-redux';

import { CalendarStyles } from './styles';

import { CalendarDateType, SettingsType } from '../../types';

interface ReduxProps {
    settings: SettingsType,
}

interface BtnProps {
    active: boolean,
    date: CalendarDateType
    onPress: () => void,
}

class DateBtn extends React.Component<ReduxProps & BtnProps> {
    render() {
        return (
            <TouchableOpacity onPress={this.props.onPress} style={CalendarStyles.btnContainer}>
                <Text style={{ ...CalendarStyles.btnText, color: this.props.active ? this.props.settings.colorScheme.textC : this.props.settings.colorScheme.dTextC }}>
                    {this.props.date.date}
                </Text>
            </TouchableOpacity>
        );
    }
}

const mapStateToProps = (state: ReduxProps) => ({
    settings: state.settings,
});

export default connect(mapStateToProps)(DateBtn);