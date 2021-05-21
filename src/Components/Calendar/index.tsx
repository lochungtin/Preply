import React from 'react';
import { Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { connect } from 'react-redux';

import DateBtn from './DateBtn';

import { CalendarStyles } from './styles';

import { SettingsType } from '../../types';
import { genCalendar, getDateNo } from '../../utils/date';
import { keygen } from '../../utils/keygen';
import moment from 'moment';

interface ReduxProps {
    settings: SettingsType,
}

interface CalendarStates {
    month: number,
    year: number,
}

class Calendar extends React.Component<ReduxProps, CalendarStates> {

    constructor(props: any) {
        super(props);
        let now = moment();
        this.state = {
            month: now.get('month') + 1,
            year: now.get('year'),
        }
    }

    render() {
        return (
            <View style={CalendarStyles.tableContainer}>
                {genCalendar(this.state.year, this.state.month).map(row => {
                    return (
                        <View key={keygen()} style={CalendarStyles.rowContainer}>
                            {row.map(date => {
                                return (
                                    <DateBtn 
                                        key={keygen()} 
                                        active={date.month === this.state.month}
                                        date={date}
                                        onPress={() => {}}
                                    />
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
    settings: state.settings,
});

export default connect(mapStateToProps)(Calendar);