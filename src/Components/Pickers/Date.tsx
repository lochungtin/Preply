import React from 'react';
import { View } from 'react-native';
import Modal from 'react-native-modal';

import {theme} from '../../data/colors';
import { PickerStyles } from './styles';

import Calendar from '../Calendar';

interface DatePickerProps {
    children: any,
    open: boolean,
    onClose: () => void,
    onDatePress: (dateString: string) => void,
    selected: string,
}

export default class DatePicker extends React.Component<DatePickerProps> {
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
                    <View style={{...PickerStyles.rootContainer, backgroundColor: theme.backgroundC}}>
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
