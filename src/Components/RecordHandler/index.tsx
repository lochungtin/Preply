import React from 'react';
import { TouchableOpacity, View, } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { connect } from 'react-redux';

import { RecordHandlerStyles } from './styles';

import { SettingsType } from '../../types';

interface ReduxProps {
    settings: SettingsType,
}

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

class RecordHandler extends React.Component<ReduxProps & HandlerProps> {
    render() {
        return (
            <View style={RecordHandlerStyles.rootContainer}>
                <TouchableOpacity onPress={this.props.onAdd} style={RecordHandlerStyles.addRecordContainer}>
                    <Icon
                        color={this.props.settings.colorScheme.textC}
                        name='plus'
                        size={30}
                    />
                </TouchableOpacity>
                <TouchableOpacity onPress={this.props.toggleSort}>
                    <Icon
                        color={this.props.isSorting ? this.props.settings.colorScheme.accent : this.props.settings.colorScheme.textC}
                        name='sort-ascending'
                        size={25}
                    />
                </TouchableOpacity>
                <TouchableOpacity onPress={this.props.toggleFilter}>
                    <Icon
                        color={this.props.isFiltering ? this.props.settings.colorScheme.accent : this.props.settings.colorScheme.textC}
                        name='filter-variant'
                        size={25}
                    />
                </TouchableOpacity>
                <TouchableOpacity onPress={this.props.toggleCalendar}>
                    <Icon
                        color={this.props.isCalendarOpen ? this.props.settings.colorScheme.accent : this.props.settings.colorScheme.textC}
                        name='calendar-outline'
                        size={25}
                    />
                </TouchableOpacity>
            </View>
        );
    }
}

const mapStateToProps = (state: ReduxProps) => ({
    settings: state.settings,
});

export default connect(mapStateToProps)(RecordHandler);
