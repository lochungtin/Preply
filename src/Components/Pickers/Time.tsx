import React from 'react';
import { TouchableOpacity, Text, View, Switch, } from 'react-native';
import Modal from 'react-native-modal';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { connect } from 'react-redux';

import { PickerStyles } from './styles';

import { SettingsType } from '../../types';
import Clock from '../Clock';

interface ReduxProps {
    settings: SettingsType,
}

interface TimePickerProps {
    children: any,
    hr: string,
    min: string,
    open: boolean,
    onClose: () => void,
    onTimePress: (timeString: string) => void,
}

class TimePicker extends React.Component<ReduxProps & TimePickerProps> {

    state = {
        hr: this.props.hr,
        min: this.props.min,
        minMode: false,
        pm: true,
    }

    onPress = (rt: string) => {
        if (this.state.minMode) {
            this.setState({});
        }
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
                >
                    <View style={{ ...PickerStyles.rootContainer, backgroundColor: this.props.settings.colorScheme.backgroundC }}>
                        <Clock
                            data={data}
                            offset={32}
                            onPress={this.onPress}
                            size={280}
                        >
                            <View style={PickerStyles.centerControlContainer}>
                                <View style={PickerStyles.timePickerLabelContainer}>
                                    <TouchableOpacity onPress={() => this.setState({ minMode: false })}>
                                        <Text style={{ ...PickerStyles.timePickerLabel, borderColor: this.props.settings.colorScheme.accent, borderBottomWidth: this.state.minMode ? 0 : 2, color: this.props.settings.colorScheme.textC }}>
                                            {this.props.hr}
                                        </Text>
                                    </TouchableOpacity>
                                    <Text style={{ ...PickerStyles.timePickerLabel, color: this.props.settings.colorScheme.textC }}>
                                        :
                                    </Text>
                                    <TouchableOpacity onPress={() => this.setState({ minMode: true })}>
                                        <Text style={{ ...PickerStyles.timePickerLabel, borderColor: this.props.settings.colorScheme.accent, borderBottomWidth: this.state.minMode ? 2 : 0, color: this.props.settings.colorScheme.textC }}>
                                            {this.props.min}
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                                <View style={PickerStyles.timePickerSwitchContainer}>
                                    <Text style={{ ...PickerStyles.timePickerSwitchLabel, color: this.state.pm ? this.props.settings.colorScheme.textC : this.props.settings.colorScheme.accent }}>
                                        AM
                                    </Text>
                                    <Switch
                                        thumbColor={this.state.pm ? this.props.settings.colorScheme.accent : this.props.settings.colorScheme.textC}
                                        onValueChange={pm => this.setState({ pm })}
                                        value={this.state.pm}
                                    />
                                    <Text style={{ ...PickerStyles.timePickerSwitchLabel, color: this.state.pm ? this.props.settings.colorScheme.accent : this.props.settings.colorScheme.textC }}>
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

const mapStateToProps = (state: ReduxProps) => ({
    settings: state.settings
});

export default connect(mapStateToProps)(TimePicker);
