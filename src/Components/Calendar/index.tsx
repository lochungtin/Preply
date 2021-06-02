import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { connect } from 'react-redux';

import DateBtn from './DateBtn';

import { CalendarStyles } from './styles';

import { SettingsType } from '../../types';
import { genCalendar, getDateNo, getName, getNextMonth, getPrevMonth } from '../../utils/date';
import { keygen } from '../../utils/keygen';
import moment from 'moment';

interface ReduxProps {
    settings: SettingsType,
}

interface CalendarProps {
    expand: boolean,
    onDatePress: (dateString: string) => void,
    toggleExpand: () => void,
}

interface CalendarStates {
    month: number,
    year: number,
}

class Calendar extends React.Component<ReduxProps & CalendarProps, CalendarStates> {

    constructor(props: any) {
        super(props);
        let now = moment();
        this.state = {
            month: now.get('month') + 1,
            year: now.get('year'),
        }
    }

    nextMonth = () => this.setState(getNextMonth(this.state.year, this.state.month));

    prevMonth = () => this.setState(getPrevMonth(this.state.year, this.state.month));

    render() {
        let grid = genCalendar(this.state.year, this.state.month);

        if (!this.props.expand) {
            let now = moment();
            let row = grid.filter(row => row.findIndex(date => date.month === now.get('month') + 1 && date.date === now.get('date')) !== -1)[0];

            return (
                <View style={CalendarStyles.rowContainer}>
                    {row.map(date => {
                        return (
                            <DateBtn
                                key={keygen()}
                                active={date.month === this.state.month}
                                date={date}
                                onPress={this.props.onDatePress}
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
                            color={this.props.settings.colorScheme.dTextC}
                            name='chevron-left'
                            size={30}
                        />
                    </TouchableOpacity>
                    <Text style={{ ...CalendarStyles.monthLabel, color: this.props.settings.colorScheme.textC }}>
                        {getName(this.state.month) + ' ' + this.state.year}
                    </Text>
                    <TouchableOpacity onPress={this.nextMonth} style={CalendarStyles.btnContainer}>
                        <Icon
                            color={this.props.settings.colorScheme.dTextC}
                            name='chevron-right'
                            size={30}
                        />
                    </TouchableOpacity>
                </TouchableOpacity>
                <View style={CalendarStyles.tableContainer}>
                    <View style={CalendarStyles.rowContainer}>
                        {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map(label => {
                            return (
                                <View key={keygen()} style={CalendarStyles.btnContainer}>
                                    <Text style={{ ...CalendarStyles.btnText, color: this.props.settings.colorScheme.accent }}>
                                        {label}
                                    </Text>
                                </View>
                            );
                        })}
                    </View>
                    {grid.map(row => {
                        return (
                            <View key={keygen()} style={CalendarStyles.rowContainer}>
                                {row.map(date => {
                                    return (
                                        <DateBtn
                                            key={keygen()}
                                            active={date.month === this.state.month}
                                            date={date}
                                            onPress={this.props.onDatePress}
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

const mapStateToProps = (state: ReduxProps) => ({
    settings: state.settings,
});

export default connect(mapStateToProps)(Calendar);