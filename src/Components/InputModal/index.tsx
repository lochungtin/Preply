import moment from 'moment';
import React from 'react';
import { ScrollView, Switch, Text, TextInput, TouchableOpacity, View, } from 'react-native';
import Modal from 'react-native-modal';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import MultiSelectModal from '../MultiSelectModal';
import DatePicker from '../Pickers/Date';
import TimePicker from '../Pickers/Time';
import InputRow from './row';
import SeparatorLine from '../SeparatorLine';
import Tag from '../Tag';

import { theme } from '../../data/colors';
import { RecordInputModalStyles, screenWidth, } from './styles';

import { tags } from '../../data/tags';
import { repeats } from '../../data/repeats';
import { addTodo } from '../../redux/action';
import { store } from '../../redux/store';
import { keygen } from '../../utils/keygen';

interface ModalProps {
    onClose: () => void,
    open: boolean,
}

export default class InputModal extends React.Component<ModalProps> {

    defaultState = {
        allDay: false,
        content: '',
        dateString: moment().format('DD-MM-YYYY'),
        notif: true,
        repeatKey: 'rep:0',
        tagKey: 'tag:0',
        timeString: '12:00 PM',
        title: '',
    }

    state = {
        ...this.defaultState,
        openDatePicker: false,
        openRepeatPicker: false,
        openTagPicker: false,
        openTimePicker: false,
    }

    refresh = () => this.setState(this.defaultState);

    save = () => {
        store.dispatch(addTodo({
            allDay: this.state.allDay,
            content: this.state.content,
            date: this.state.dateString,
            key: keygen(),
            notif: this.state.notif,
            repeatKey: this.state.repeatKey,
            tagKey: this.state.tagKey,
            title: this.state.title || 'untitled',
            time: this.state.timeString,
        }));
        this.props.onClose();
    }

    render() {
        return (
            <Modal
                backdropOpacity={0}
                isVisible={this.props.open}
                onBackButtonPress={this.props.onClose}
                onBackdropPress={this.props.onClose}
                onModalWillShow={this.refresh}
                onSwipeComplete={this.props.onClose}
                propagateSwipe={true}
                style={RecordInputModalStyles.positioner}
                swipeDirection='down'
            >
                <ScrollView>
                    <View style={{ ...RecordInputModalStyles.rootContainer, backgroundColor: theme.modalBgC }}>
                        <TouchableOpacity onPress={this.props.onClose} style={RecordInputModalStyles.closeBtn}>
                            <Icon
                                color={theme.textC}
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
                            <TouchableOpacity onPress={this.save}>
                                <Icon
                                    color={theme.textC}
                                    name='chevron-right'
                                    size={30}
                                />
                            </TouchableOpacity>
                        </InputRow>
                        <SeparatorLine width={screenWidth * 0.9} />
                        <InputRow iconName='calendar-text'>
                            <DatePicker
                                onClose={() => this.setState({ openDatePicker: false })}
                                onDatePress={dateString => this.setState({ dateString, openDatePicker: false })}
                                open={this.state.openDatePicker}
                                selected={this.state.dateString}
                            >
                                <TouchableOpacity onPress={() => this.setState({ openDatePicker: true })}>
                                    <Text style={{ ...RecordInputModalStyles.labelText, color: theme.textC }}>
                                        {this.state.dateString}
                                    </Text>
                                </TouchableOpacity>
                            </DatePicker>
                        </InputRow>
                        <InputRow iconName='clock-outline'>
                            <Text style={{ ...RecordInputModalStyles.labelText, color: theme.textC }}>
                                All Day
                            </Text>
                            <Switch
                                onValueChange={allDay => this.setState({ allDay })}
                                thumbColor={this.state.allDay ? theme.accent : theme.textC}
                                value={this.state.allDay}
                            />
                        </InputRow>
                        {!this.state.allDay && <InputRow iconName='blank'>
                            <TimePicker
                                hr={this.state.timeString.split(':')[0]}
                                min={this.state.timeString.split(':')[1].substring(0, 2)}
                                onClose={() => this.setState({ openTimePicker: false })}
                                onTimePress={timeString => this.setState({ timeString, openTimePicker: false })}
                                open={this.state.openTimePicker}
                                pm={this.state.timeString.split(' ')[1] === 'PM'}
                            >
                                <TouchableOpacity onPress={() => this.setState({ openTimePicker: true })}>
                                    <Text style={{ ...RecordInputModalStyles.labelText, color: theme.textC }}>
                                        {this.state.timeString}
                                    </Text>
                                </TouchableOpacity>
                            </TimePicker>
                        </InputRow>}
                        <InputRow iconName='sync'>
                            <MultiSelectModal
                                items={repeats.map(rep => {
                                    return (
                                        <Text style={{ ...RecordInputModalStyles.labelText, color: theme.textC }}>
                                            {rep.name}
                                        </Text>
                                    );
                                })}
                                onClose={() => this.setState({ openRepeatPicker: false })}
                                onItemPress={repeatKey => this.setState({ repeatKey: 'rep:' + repeatKey, openRepeatPicker: false })}
                                open={this.state.openRepeatPicker}
                                selected={parseInt(this.state.repeatKey.substring(4))}
                            >
                                <TouchableOpacity onPress={() => this.setState({ openRepeatPicker: true })}>
                                    <Text style={{ ...RecordInputModalStyles.labelText, color: theme.textC }}>
                                        {repeats[parseInt(this.state.repeatKey.substring(4))].name}
                                    </Text>
                                </TouchableOpacity>
                            </MultiSelectModal>
                        </InputRow>
                        <SeparatorLine width={screenWidth * 0.9} />
                        <InputRow iconName='bell-outline'>
                            <Text style={{ ...RecordInputModalStyles.labelText, color: theme.textC }}>
                                Notifications
                            </Text>
                            <Switch
                                onValueChange={notif => this.setState({ notif })}
                                thumbColor={this.state.notif ? theme.accent : theme.textC}
                                value={this.state.notif}
                            />
                        </InputRow>
                        <SeparatorLine width={screenWidth * 0.9} />
                        <InputRow iconName='tag-outline'>
                            <Text style={{ ...RecordInputModalStyles.labelText, color: theme.textC }}>
                                Tag
                            </Text>
                            <MultiSelectModal
                                items={tags.map(tag => {
                                    return (
                                        <Tag {...tag} width={150} />
                                    );
                                })}
                                onClose={() => this.setState({ openTagPicker: false })}
                                onItemPress={tagKey => this.setState({ tagKey: 'tag' + tagKey, openDatePicker: false })}
                                open={this.state.openTagPicker}
                                selected={parseInt(this.state.tagKey.substring(4))}
                            >
                                <TouchableOpacity onPress={() => this.setState({ openTagPicker: true })}>
                                    <Tag {...tags[parseInt(this.state.tagKey.substring(4))]} />
                                </TouchableOpacity>
                            </MultiSelectModal>
                        </InputRow>
                        <SeparatorLine width={screenWidth * 0.9} />
                        <InputRow iconName='card-text-outline'>
                            <TextInput
                                multiline
                                onChangeText={content => this.setState({ content })}
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
