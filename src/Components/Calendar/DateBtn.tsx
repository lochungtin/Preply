import moment from 'moment';
import React from 'react';
import { Text, TouchableOpacity, } from 'react-native';

import { theme } from '../../data/colors';
import { CalendarStyles } from './styles';

import { CalendarDateType } from '../../types';
import { format } from '../../utils/date';

interface BtnProps {
    active: boolean,
    date: CalendarDateType,
    onPress: (dateString: string) => void,
    selected: boolean,
}

export default class DateBtn extends React.Component<BtnProps> {
    render() {
        let color: string = this.props.active ? theme.textC : theme.dTextC;
        let formattedDate = format(this.props.date);
        if (moment().format('DD-MM-YYYY') === formattedDate)
            color = theme.accent;

        return (
            <TouchableOpacity onPress={() => this.props.onPress(formattedDate)} style={{...CalendarStyles.btnContainer, borderColor: theme.accent, borderWidth: this.props.selected ? 1 : 0}}>
                <Text style={{ ...CalendarStyles.btnText, color }}>
                    {this.props.date.date}
                </Text>
            </TouchableOpacity>
        );
    }
}