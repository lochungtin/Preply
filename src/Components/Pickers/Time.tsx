import React from 'react';
import { Switch, TouchableOpacity, Text, View } from 'react-native';
import Modal from 'react-native-modal';

import Clock from '../Clock';

import { theme } from '../../data/colors';
import { PickerStyles } from './styles';

interface TimePickerProps {
    children: any,
    hr: string,
    min: string,
    open: boolean,
    onClose: () => void,
    onTimePress: (timeString: string) => void,
    pm: boolean,
}

export default class TimePicker extends React.Component<TimePickerProps> {

    state = {
        hr: this.props.hr,
        min: this.props.min,
        minMode: false,
        pm: true,
    }

    onPress = (rt: string) => {
        if (this.state.minMode)
            this.props.onTimePress(`${this.state.hr}:${rt} ${this.state.pm ? 'PM' : 'AM'}`);
        else
            this.setState({ minMode: true, hr: rt });
    }

    render() {
        let data = ['12', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11'];

        if (this.state.minMode)
            data = ['00', '05', '10', '15', '20', '25', '30', '35', '40', '45', '50', '55'];

        return (
            <>
                {this.props.children}
                <Modal
                    isVisible={this.props.open}
                    onBackButtonPress={this.props.onClose}
                    onBackdropPress={this.props.onClose}
                    onSwipeComplete={this.props.onClose}
                    onModalShow={() => this.setState({ hr: this.props.hr, min: this.props.min, minMode: false, pm: this.props.pm })}
                    style={PickerStyles.modalStyle}
                >
                    <View style={{ ...PickerStyles.rootContainer, backgroundColor: theme.backgroundC }}>
                        <Clock
                            data={data}
                            offset={32}
                            onPress={this.onPress}
                            size={280}
                        >
                            <View style={PickerStyles.centerControlContainer}>
                                <View style={PickerStyles.timePickerLabelContainer}>
                                    <TouchableOpacity onPress={() => this.setState({ minMode: false })}>
                                        <Text style={{ ...PickerStyles.timePickerLabel, borderColor: theme.accent, borderBottomWidth: this.state.minMode ? 0 : 2, color: theme.textC }}>
                                            {this.state.hr}
                                        </Text>
                                    </TouchableOpacity>
                                    <Text style={{ ...PickerStyles.timePickerLabel, color: theme.textC }}>
                                        :
                                    </Text>
                                    <TouchableOpacity onPress={() => this.setState({ minMode: true })}>
                                        <Text style={{ ...PickerStyles.timePickerLabel, borderColor: theme.accent, borderBottomWidth: this.state.minMode ? 2 : 0, color: theme.textC }}>
                                            {this.state.min}
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                                <View style={PickerStyles.timePickerSwitchContainer}>
                                    <Text style={{ ...PickerStyles.timePickerSwitchLabel, color: this.state.pm ? theme.textC : theme.accent }}>
                                        AM
                                    </Text>
                                    <Switch
                                        thumbColor={this.state.pm ? theme.accent : theme.textC}
                                        onValueChange={pm => this.setState({ pm })}
                                        value={this.state.pm}
                                    />
                                    <Text style={{ ...PickerStyles.timePickerSwitchLabel, color: this.state.pm ? theme.accent : theme.textC }}>
                                        PM
                                    </Text>
                                </View>
                            </View>
                        </Clock>
                    </View>
                </Modal>
            </>
        );
    }
}
