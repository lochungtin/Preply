import moment from 'moment';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import DateBtn from './DateBtn';

import { theme } from '../../data/colors';
import { CalendarStyles } from './styles';

import { CalendarDateType } from '../../types';
import { format, genCalendar, getName, getNextMonth, getPrevMonth } from '../../utils/date';
import { keygen } from '../../utils/keygen';

interface CalendarProps {
    expand: boolean,
    onDatePress: (dateString: string) => void,
    selected: string,
    toggleExpand: () => void,
}

export default class Calendar extends React.Component<CalendarProps> {

    state = {
        month: moment().get('month') + 1,
        year: moment().get('year'),
    }

    nextMonth = () => this.setState(getNextMonth(this.state.year, this.state.month));

    prevMonth = () => this.setState(getPrevMonth(this.state.year, this.state.month));

    render() {
        let grid: Array<Array<CalendarDateType>> = genCalendar(this.state.year, this.state.month);

        if (!this.props.expand) {
            let row: Array<CalendarDateType>;

            if (this.props.selected) {
                let dateSplt: Array<string> = this.props.selected.split('-');
                row = genCalendar(parseInt(dateSplt[2]), parseInt(dateSplt[1]))
                    .filter(row => row.findIndex(date => format(date) === this.props.selected) !== -1)[0];
            }
            else {
                let now: moment.Moment = moment();
                row = genCalendar(now.get('year'), now.get('month') + 1)
                    .filter(row => row.findIndex(date => date.month === now.get('month') + 1 && date.date === now.get('date')) !== -1)[0];
            }

            return (
                <View style={CalendarStyles.rowContainer}>
                    {row.map((date: CalendarDateType) => {
                        return (
                            <DateBtn
                                key={keygen()}
                                active={true}
                                date={date}
                                onPress={this.props.onDatePress}
                                selected={format(date) === this.props.selected}
                            />
                        );
                    })}
                </View>
            );
        }

        return (
            <View style={CalendarStyles.rootContainer}>
                <TouchableOpacity style={CalendarStyles.navContainer}>
                    <TouchableOpacity onPress={this.prevMonth} style={CalendarStyles.btnContainer}>
                        <Icon
                            color={theme.dTextC}
                            name='chevron-left'
                            size={30}
                        />
                    </TouchableOpacity>
                    <Text style={{ ...CalendarStyles.monthLabel, color: theme.textC }}>
                        {getName(this.state.month) + ' ' + this.state.year}
                    </Text>
                    <TouchableOpacity onPress={this.nextMonth} style={CalendarStyles.btnContainer}>
                        <Icon
                            color={theme.dTextC}
                            name='chevron-right'
                            size={30}
                        />
                    </TouchableOpacity>
                </TouchableOpacity>
                <View style={CalendarStyles.tableContainer}>
                    <View style={CalendarStyles.rowContainer}>
                        {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((label: string) => {
                            return (
                                <View key={keygen()} style={CalendarStyles.btnContainer}>
                                    <Text style={{ ...CalendarStyles.btnText, color: theme.accent }}>
                                        {label}
                                    </Text>
                                </View>
                            );
                        })}
                    </View>
                    {grid.map((row: Array<CalendarDateType>) => {
                        return (
                            <View key={keygen()} style={CalendarStyles.rowContainer}>
                                {row.map((date: CalendarDateType) => {
                                    return (
                                        <DateBtn
                                            key={keygen()}
                                            active={date.month === this.state.month}
                                            date={date}
                                            onPress={this.props.onDatePress}
                                            selected={format(date) === this.props.selected}
                                        />
                                    );
                                })}
                            </View>
                        );
                    })}
                </View>
            </View>
        );
    }
}
