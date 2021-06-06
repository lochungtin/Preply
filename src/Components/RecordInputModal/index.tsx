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

interface ModalProps {
    onClose: () => void,
    onSave: (obj: any) => void,
    open: boolean,
}

export default class RecordInputModal extends React.Component<ModalProps> {

    state = {
        allDay: false,
        dateString: moment().format('DD-MM-YYYY'),
        notif: true,
        openDatePicker: false,
        openRepeatPicker: false,
        openTagPicker: false,
        openTimePicker: false,
        repeatKey: 'rep:0',
        tagKey: 'tag:0',
        timeString: '12:00 PM',
        title: '',
    }

    refresh = () => this.setState({
        allDay: false,
        dateString: moment().format('DD-MM-YYYY'),
        notif: true,
        tagKey: 'tag:0',
        timeString: '12:00 PM',
        title: '',
    });

    save = () => {

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
                                onChangeText={text => console.log(text)}
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
