import React from 'react';
import { ScrollView, TouchableOpacity, View, } from 'react-native';
import Modal from 'react-native-modal';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { connect } from 'react-redux';

import { MSMStyles, screenWidth, } from './styles';

import { SettingsType } from '../../types';

interface ReduxProps {
    settings: SettingsType,
}

interface ModalProps {
    children: any,
    items: Array<any>,
    open: boolean,
    onClose: () => void,
    onTagPress: (key: string) => void,
}

class RecordInputModal extends React.Component<ReduxProps & ModalProps> {

    render() {
        return (
            <>
                {this.props.children}
                <Modal
                    isVisible={this.props.open}
                    onBackButtonPress={this.props.onClose}
                    onBackdropPress={this.props.onClose}
                    onSwipeComplete={this.props.onClose}
                >
                    {this.props.items}
                </Modal>
            </>
        );
    }
}

const mapStateToProps = (state: ReduxProps) => ({
    settings: state.settings,
});

export default connect(mapStateToProps)(RecordInputModal);
