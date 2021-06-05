import moment from 'moment';
import React from 'react';
import { ScrollView, Switch, Text, TextInput, TouchableOpacity, View, } from 'react-native';
import Modal from 'react-native-modal';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { connect } from 'react-redux';

import SeparatorLine from '../SeparatorLine';
import DatePicker from '../Pickers/Date';
import TimePicker from '../Pickers/Time';
import InputRow from './row';

import { RecordInputModalStyles, screenWidth, } from './styles';

import { SettingsType } from '../../types';
import Tag from '../Tag';
import MultiSelectModal from '../MultiSelectModal';

interface ReduxProps {
    settings: SettingsType,
}

interface ModalProps {
    onClose: () => void,
    onSave: (obj: any) => void,
    open: boolean,
    routine?: boolean,
}

class RecordInputModal extends React.Component<ReduxProps & ModalProps> {

    state = {
        allDay: false,
        dateString: moment().format('DD-MM-YYYY'),
        notif: true,
        openDatePicker: false,
        openTagPicker: false,
        openTimePicker: false,
        tagKey: 'tag:default',
        timeString: '12:00 PM',
        title: '',
    }

    datePickerOnSelect = (dateString: string) => {
        console.log(dateString);
        this.setState({ dateString, openDatePicker: false });
    }

    tagPickerOnSelect = (tagKey: string) => {
        console.log(tagKey);
        this.setState({ tagKey });
    }

    timePickerOnSelect = (timeString: string) => {
        console.log(timeString);
        this.setState({ timeString, openTimePicker: false });
    }

    render() {
        return (
            <Modal
                backdropOpacity={0}
                isVisible={this.props.open}
                onBackButtonPress={this.props.onClose}
                onBackdropPress={this.props.onClose}
                onSwipeComplete={this.props.onClose}
                propagateSwipe={true}
                style={RecordInputModalStyles.positioner}
                swipeDirection='down'
            >
                <ScrollView>
                    <View style={{ ...RecordInputModalStyles.rootContainer, backgroundColor: this.props.settings.colorScheme.modalBgC }}>
                        <TouchableOpacity onPress={this.props.onClose} style={RecordInputModalStyles.closeBtn}>
                            <Icon
                                color={this.props.settings.colorScheme.textC}
                                name='chevron-down'
                                size={30}
                            />
                        </TouchableOpacity>
                        <SeparatorLine width={screenWidth * 0.9} />
                        <InputRow iconName='blank'>
                            <TextInput
                                onChangeText={title => this.setState({ title })}
                                placeholder='title'
                                style={RecordInputModalStyles.titleTextInput}
                                value={this.state.title || undefined}
                            />
                        </InputRow>
                        <SeparatorLine width={screenWidth * 0.9} />
                        <InputRow iconName='calendar-text'>
                            <DatePicker
                                open={this.state.openDatePicker}
                                onClose={() => this.setState({ openDatePicker: false })}
                                onDatePress={this.datePickerOnSelect}
                                selected={this.state.dateString}
                            >
                                <TouchableOpacity onPress={() => this.setState({ openDatePicker: true })}>
                                    <Text style={{ ...RecordInputModalStyles.labelText, color: this.props.settings.colorScheme.textC }}>
                                        {this.state.dateString}
                                    </Text>
                                </TouchableOpacity>
                            </DatePicker>
                        </InputRow>
                        <InputRow iconName='clock-outline'>
                            <Text style={{ ...RecordInputModalStyles.labelText, color: this.props.settings.colorScheme.textC }}>
                                All Day
                            </Text>
                            <Switch
                                onValueChange={allDay => this.setState({ allDay })}
                                thumbColor={this.state.allDay ? this.props.settings.colorScheme.accent : this.props.settings.colorScheme.textC}
                                value={this.state.allDay}
                            />
                        </InputRow>
                        {!this.state.allDay && <InputRow iconName='blank'>
                            <TimePicker
                                hr={this.state.timeString.split(':')[0]}
                                min={this.state.timeString.split(':')[1].substring(0, 2)}
                                open={this.state.openTimePicker}
                                onClose={() => this.setState({ openTimePicker: false })}
                                onTimePress={this.timePickerOnSelect}
                                pm={this.state.timeString.split(' ')[1] === 'PM'}
                            >
                                <TouchableOpacity onPress={() => this.setState({ openTimePicker: true })}>
                                    <Text style={{ ...RecordInputModalStyles.labelText, color: this.props.settings.colorScheme.textC }}>
                                        {this.state.timeString}
                                    </Text>
                                </TouchableOpacity>
                            </TimePicker>
                        </InputRow>}
                        {this.props.routine && <>
                            <InputRow iconName='sync'>
                                <Text>
                                    No Repeats
                                </Text>
                            </InputRow>
                            <InputRow iconName='blank'>

                            </InputRow>
                        </>}
                        <SeparatorLine width={screenWidth * 0.9} />
                        <InputRow iconName='bell-outline'>
                            <Text style={{ ...RecordInputModalStyles.labelText, color: this.props.settings.colorScheme.textC }}>
                                Notifications
                            </Text>
                            <Switch
                                onValueChange={notif => this.setState({ notif })}
                                thumbColor={this.state.notif ? this.props.settings.colorScheme.accent : this.props.settings.colorScheme.textC}
                                value={this.state.notif}
                            />
                        </InputRow>
                        <SeparatorLine width={screenWidth * 0.9} />
                        <InputRow iconName='tag-outline'>
                            <Text style={{ ...RecordInputModalStyles.labelText, color: this.props.settings.colorScheme.textC }}>
                                Tag
                            </Text>
                            <MultiSelectModal
                                items={[
                                    <Tag color={this.props.settings.colorScheme.accent} name='Default' />,
                                    <Tag color={this.props.settings.colorScheme.accent} name='Default' />,
                                    <Tag color={this.props.settings.colorScheme.accent} name='Default' />,
                                ]}
                                open={this.state.openTagPicker}
                                onClose={() => this.setState({ openTagPicker: false })}
                                onTagPress={this.tagPickerOnSelect}
                            >
                                <TouchableOpacity onPress={() => this.setState({ openTagPicker: true })}>
                                    <Tag color={this.props.settings.colorScheme.accent} name='Default' />
                                </TouchableOpacity>
                            </MultiSelectModal>
                        </InputRow>
                        <SeparatorLine width={screenWidth * 0.9} />
                        <InputRow iconName='card-text-outline'>
                            <TextInput
                                multiline
                                placeholder='Description ...'
                                style={RecordInputModalStyles.descriptionInput}
                            />
                        </InputRow>
                    </View>
                </ScrollView>
            </Modal>
        );
    }
}

const mapStateToProps = (state: ReduxProps) => ({
    settings: state.settings,
});

export default connect(mapStateToProps)(RecordInputModal);
