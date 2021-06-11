import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { theme } from '../../data/colors';
import HandlerBtn from './HandlerBtn';
import { RecordHandlerStyles } from './styles';

interface HandlerProps {
    calendar?: boolean,
    canUndo: boolean,
    isSorting: boolean,
    isFiltering: boolean,
    isCalendarOpen?: boolean,
    onAdd: () => void,
    toggleCalendar?: () => void,
    toggleFilter: () => void,
    toggleSort: () => void,
    undo: () => void,
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
                {!this.props.calendar && <Icon color='transparent' name='plus' size={30} />}
                <HandlerBtn
                    active={this.props.canUndo}
                    iconName='undo'
                    onPress={this.props.undo}
                />
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
                {this.props.calendar && <HandlerBtn
                    active={this.props.isCalendarOpen || false}
                    iconName='calendar-outline'
                    onPress={this.props.toggleCalendar || (() => {})}
                />}
            </View>
        );
    }
}
