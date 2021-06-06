import React from 'react';
import { TouchableOpacity, View, } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { theme } from '../../data/colors';
import { RecordHandlerStyles } from './styles';

interface HandlerProps {
    isSorting: boolean,
    isFiltering: boolean,
    isCalendarOpen: boolean,
    onAdd: () => void,
    toggleCalendar: () => void,
    toggleFilter: () => void,
    toggleSort: () => void,
    type: string,
}

export default class RecordHandler extends React.Component<HandlerProps> {
    render() {
        return (
            <View style={RecordHandlerStyles.rootContainer}>
                <TouchableOpacity onPress={this.props.onAdd} style={RecordHandlerStyles.addRecordContainer}>
                    <Icon
                        color={theme.textC}
                        name='plus'
                        size={30}
                    />
                </TouchableOpacity>
                <TouchableOpacity onPress={this.props.toggleSort}>
                    <Icon
                        color={this.props.isSorting ? theme.accent : theme.textC}
                        name='sort-ascending'
                        size={25}
                    />
                </TouchableOpacity>
                <TouchableOpacity onPress={this.props.toggleFilter}>
                    <Icon
                        color={this.props.isFiltering ? theme.accent : theme.textC}
                        name='filter-variant'
                        size={25}
                    />
                </TouchableOpacity>
                <TouchableOpacity onPress={this.props.toggleCalendar}>
                    <Icon
                        color={this.props.isCalendarOpen ? theme.accent : theme.textC}
                        name='calendar-outline'
                        size={25}
                    />
                </TouchableOpacity>
            </View>
        );
    }
}
