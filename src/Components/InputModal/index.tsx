import moment from 'moment';
import React from 'react';
import { ScrollView, Switch, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Modal from 'react-native-modal';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { connect } from 'react-redux';

import MultiSelectModal from '../MultiSelectModal';
import DatePicker from '../Pickers/Date';
import TimePicker from '../Pickers/Time';
import InputRow from './row';
import SeparatorLine from '../SeparatorLine';
import Tag from '../Tag';

import { theme } from '../../data/colors';
import { RecordInputModalStyles, screenWidth } from './styles';

import { repeats } from '../../data/repeats';
import { tags } from '../../data/tags';
import { firebaseAddTodo, firebaseSetTodo } from '../../firebase/data';
import { addTodo, editTodo } from '../../redux/action';
import { store } from '../../redux/store';
import { AccountType, RepeatType, TagType, TodoType } from '../../types';
import { keygen } from '../../utils/keygen';
import NotifService from '../../notification';
import { ReceivedNotification } from 'react-native-push-notification';

interface ModalProps {
    onClose: () => void,
    open: boolean,
    record?: TodoType,
}

interface ReduxProps {
    account: AccountType,
}

class InputModal extends React.Component<ReduxProps & ModalProps> {

    notif: NotifService;

    constructor(props: ReduxProps & ModalProps) {
        super(props);

        this.notif = new NotifService(
            this.onRegister.bind(this),
            this.onNotif.bind(this),
        );
    }

    defaultState = {
        allDay: true,
        content: '',
        date: moment().format('DD-MM-YYYY'),
        edited: false,
        notif: false,
        repeatKey: 'rep:0',
        tagKey: 'tag:0',
        time: '12:00 PM',
        title: '',
    }

    state = {
        ...this.defaultState,
        openDatePicker: false,
        openRepeatPicker: false,
        openTagPicker: false,
        openTimePicker: false,
    }

    onNotif = (notification: Omit<ReceivedNotification, "userInfo">) => { }

    onRegister = (token: { os: string, token: string }) => { }

    refresh = () => {
        if (this.props.record)
            this.setState({ ...this.props.record, edited: false });
        else
            this.setState(this.defaultState);
    }

    save = () => {
        let now: string = moment().format('YYYY-MM-DD HH:mm:ss');
        let payload: TodoType = {
            allDay: this.state.allDay,
            content: this.state.content,
            date: this.state.date,
            key: '',
            meta: {
                creation: '',
                modified: '',
            },
            notif: this.state.notif,
            notifID: '',
            repeatKey: this.state.repeatKey,
            tagKey: this.state.tagKey,
            title: this.state.title || 'untitled',
            time: this.state.time,
        };

        if (this.props.record) {
            // apply new meta data
            payload.key = this.props.record.key;
            payload.meta = {
                creation: this.props.record.meta.creation,
                modified: now,
            };

            // handle notifications
            if (payload.notif) {
                if (payload.notifID)
                    this.notif.cancelNotif(payload.notifID);
                payload.notifID = this.scheduleNotifs(payload);
            }

            if (this.props.record.notif && !payload.notif)
                this.notif.cancelNotif(this.props.record.notifID);

            // dispatch to local store and firebase
            store.dispatch(editTodo(payload));
            if (this.props.account !== null)
                firebaseSetTodo(this.props.account.uid, payload);
        }
        else {
            // create meta data
            payload.key = keygen();
            payload.meta = {
                creation: now,
                modified: now,
            };

            // handle notifications
            if (payload.notif)
                payload.notifID = this.scheduleNotifs(payload);

            // dispatch to local store and firebase
            store.dispatch(addTodo(payload));
            if (this.props.account !== null)
                firebaseAddTodo(this.props.account.uid, payload);
        }

        this.props.onClose();
    }

    scheduleNotifs = (payload: TodoType) => {
        let repeatType: string | undefined = repeats[parseInt(payload.repeatKey.substring(4))].handlerName;
        let color: string = tags[parseInt(payload.tagKey.substring(4))].color;

        let timestamp: moment.Moment = moment(`${payload.date} ${payload.time}`, 'DD-MM-YYYY LT')
            .subtract(5, 'minute');

        // add time if on repeat and time set for first notif has passed
        if (timestamp.isBefore(moment())) {
            console.log(timestamp.toString());
            switch (payload.repeatKey) {
                case 'rep:1':
                    timestamp.add(1, 'day');
                    break;
                case 'rep:2':
                    timestamp.add(1, 'week');
                    break;
                case 'rep:3':
                    timestamp.add(1, 'month');
                    break;
                default:
                    return '';
            }
        }

        return this.notif.scheduleNotif(timestamp.toString(), color, payload.title, repeatType).toString();
    }

    temp = () => {
        this.notif.scheduleNotif(moment().add(2, 'second').toString(), '#ffffff', 'test', undefined);
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
                                onChangeText={title => this.setState({ title, edited: true })}
                                placeholder='title'
                                placeholderTextColor={theme.dTextC}
                                style={{ ...RecordInputModalStyles.titleTextInput, color: theme.textC }}
                                value={this.state.title || undefined}
                            />
                            <TouchableOpacity onPress={this.save}>
                                <Icon
                                    color={this.state.edited ? theme.accent : theme.textC}
                                    name='content-save-outline'
                                    size={30}
                                />
                            </TouchableOpacity>
                        </InputRow>
                        <SeparatorLine width={screenWidth * 0.9} />

                        <InputRow iconName='calendar-text'>
                            <DatePicker
                                onClose={() => this.setState({ openDatePicker: false })}
                                onDatePress={date => this.setState({ date, edited: true, openDatePicker: false })}
                                open={this.state.openDatePicker}
                                selected={this.state.date}
                            >
                                <TouchableOpacity onPress={() => this.setState({ openDatePicker: true })}>
                                    <Text style={{ ...RecordInputModalStyles.labelText, color: theme.textC }}>
                                        {this.state.date}
                                    </Text>
                                </TouchableOpacity>
                            </DatePicker>
                        </InputRow>
                        <InputRow iconName='clock-outline'>
                            <Text style={{ ...RecordInputModalStyles.labelText, color: theme.textC }}>
                                All Day
                            </Text>
                            <Switch
                                onValueChange={allDay => this.setState({ allDay, edited: true })}
                                thumbColor={this.state.allDay ? theme.accent : theme.textC}
                                value={this.state.allDay}
                            />
                        </InputRow>
                        {!this.state.allDay && <InputRow iconName='blank'>
                            <TimePicker
                                hr={this.state.time.split(':')[0]}
                                min={this.state.time.split(':')[1].substring(0, 2)}
                                onClose={() => this.setState({ openTimePicker: false })}
                                onTimePress={time => this.setState({ time, edited: true, openTimePicker: false })}
                                open={this.state.openTimePicker}
                                pm={this.state.time.split(' ')[1] === 'PM'}
                            >
                                <TouchableOpacity onPress={() => this.setState({ openTimePicker: true })}>
                                    <Text style={{ ...RecordInputModalStyles.labelText, color: theme.textC }}>
                                        {this.state.time}
                                    </Text>
                                </TouchableOpacity>
                            </TimePicker>
                        </InputRow>}
                        <InputRow iconName='sync'>
                            <MultiSelectModal
                                items={repeats.map((rep: RepeatType) => {
                                    return (
                                        <Text style={{ ...RecordInputModalStyles.labelText, color: theme.textC }}>
                                            {rep.name}
                                        </Text>
                                    );
                                })}
                                onClose={() => this.setState({ openRepeatPicker: false })}
                                onItemPress={repeatKey => this.setState({ edited: true, repeatKey: 'rep:' + repeatKey, openRepeatPicker: false })}
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
                                onValueChange={notif => this.setState({ notif, edited: true })}
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
                                items={tags.map((tag: TagType) => {
                                    return (
                                        <Tag {...tag} width={150} />
                                    );
                                })}
                                onClose={() => this.setState({ openTagPicker: false })}
                                onItemPress={tagKey => this.setState({ edited: true, tagKey: 'tag:' + tagKey, openTagPicker: false })}
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
                                onChangeText={content => this.setState({ content, edited: true })}
                                placeholder='Description ...'
                                placeholderTextColor={theme.dTextC}
                                style={{ ...RecordInputModalStyles.descriptionInput, color: theme.textC }}
                            />
                        </InputRow>
                    </View>
                </ScrollView>
            </Modal>
        );
    }
}

const mapStateToProps = (state: ReduxProps) => ({
    account: state.account,
});

export default connect(mapStateToProps)(InputModal);
