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
    onClose: () => void,
    onDatePress: (dateString: string) => void,
    selected: string,
}

class DatePicker extends React.Component<ReduxProps & DatePickerProps> {
    render() {
        return (
            <>
                {this.props.children}
                <Modal
                    isVisible={this.props.open}  
                    onBackButtonPress={this.props.onClose}
                    onBackdropPress={this.props.onClose}
                    onSwipeComplete={this.props.onClose}
                    style={PickerStyles.modalStyle} 
                >
                    <View style={{...PickerStyles.rootContainer, backgroundColor: this.props.settings.colorScheme.backgroundC}}>
                        <Calendar
                            expand={true}
                            onDatePress={this.props.onDatePress}
                            toggleExpand={() => {}}
                            selected={this.props.selected}
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
