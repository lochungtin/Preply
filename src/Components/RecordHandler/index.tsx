import React from 'react';
import { TouchableOpacity, View, } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { theme } from '../../data/colors';
import HandlerBtn from './HandlerBtn';
import { RecordHandlerStyles } from './styles';

interface HandlerProps {
    isSorting: boolean,
    isFiltering: boolean,
    isCalendarOpen: boolean,
    onAdd: () => void,
    toggleCalendar: () => void,
    toggleFilter: () => void,
    toggleSort: () => void,
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
                <HandlerBtn
                    active={this.props.isSorting}
                    iconName='sort-ascending'
                    onPress={this.props.toggleSort}
                />
                <HandlerBtn
                    active={this.props.isFiltering}
                    iconName='filter-variant'
                    onPress={this.props.toggleFilter}
                />
                <HandlerBtn
                    active={this.props.isCalendarOpen}
                    iconName='calendar-outline'
                    onPress={this.props.toggleCalendar}
                />
            </View>
        );
    }
}
