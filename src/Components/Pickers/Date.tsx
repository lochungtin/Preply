import React from 'react';
import { TouchableOpacity, Text, View, } from 'react-native';
import Modal from 'react-native-modal';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { connect } from 'react-redux';

import { PickerStyles } from './styles';

import { SettingsType } from '../../types';
import Calendar from '../Calendar';

interface ReduxProps {
    settings: SettingsType,
}

interface DatePickerProps {
    children: any,
    open: boolean,
    onDatePress: (dateString: string) => void,
}

class DatePicker extends React.Component<ReduxProps & DatePickerProps> {
    render() {
        return (
            <>
                {this.props.children}
                <Modal
                    isVisible={this.props.open}   
                >
                    <View
                        style={{...PickerStyles.rootContainer, backgroundColor: this.props.settings.colorScheme.backgroundC}}
                    >
                        <Calendar
                            expand={true}
                            onDatePress={this.props.onDatePress}
                            toggleExpand={() => {}}
                        />
                    </View>
                </Modal>
            </>
        );
    }
}

const mapStateToProps = (state: ReduxProps) => ({
    settings: state.settings
});

export default connect(mapStateToProps)(DatePicker);
