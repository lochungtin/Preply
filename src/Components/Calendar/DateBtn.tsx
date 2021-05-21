import moment from 'moment';
import React from 'react';
import { Text, TouchableOpacity, } from 'react-native';
import { connect } from 'react-redux';

import { CalendarStyles } from './styles';

import { CalendarDateType, SettingsType } from '../../types';
import { format } from '../../utils/date';

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
        let color: string = this.props.active ? this.props.settings.colorScheme.textC : this.props.settings.colorScheme.dTextC;
        if (moment().format('DD-MM-YYYY') === format(this.props.date))
            color = this.props.settings.colorScheme.accent;

        return (
            <TouchableOpacity onPress={this.props.onPress} style={CalendarStyles.btnContainer}>
                <Text style={{ ...CalendarStyles.btnText, color }}>
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