import React from 'react';
import { ScrollView, Switch, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Modal from 'react-native-modal';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { connect } from 'react-redux';

import Calendar from '../Calendar';
import SeparatorLine from '../SeparatorLine';
import InputRow from './row';

import { RecordInputModalStyles, screenWidth } from './styles';

import { SettingsType } from '../../types';

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
                                placeholder='title'
                                style={RecordInputModalStyles.titleTextInput}
                            />
                        </InputRow>
                        <SeparatorLine width={screenWidth * 0.9} />
                        <InputRow iconName='calendar-text'>
                            <Text>
                                DD/MM/YYYY
                            </Text>
                        </InputRow>
                        <InputRow iconName='clock-outline'>
                            <Text style={{ ...RecordInputModalStyles.labelText, color: this.props.settings.colorScheme.textC }}>
                                All Day
                                </Text>
                            <Switch
                                onValueChange={allDay => this.setState({ allDay })}
                                value={this.state.allDay}
                            />
                        </InputRow>
                        {!this.state.allDay && <InputRow iconName='blank'>
                            <Text style={{ ...RecordInputModalStyles.labelText, color: this.props.settings.colorScheme.textC }}>
                                All Day
                            </Text>
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
                        <InputRow iconName='tag-outline'>
                            <Text style={{ ...RecordInputModalStyles.labelText, color: this.props.settings.colorScheme.textC }}>
                                Tag
                            </Text>
                        </InputRow>
                        <InputRow iconName='blank'>

                        </InputRow>
                        <SeparatorLine width={screenWidth * 0.9} />
                        <InputRow iconName='card-text-outline'>
                            <TextInput
                                multiline
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