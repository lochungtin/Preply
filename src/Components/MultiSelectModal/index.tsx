import React from 'react';
import { ScrollView, TouchableOpacity, View, } from 'react-native';
import Modal from 'react-native-modal';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { connect } from 'react-redux';

import { MSMStyles, screenWidth, } from './styles';

import { SettingsType } from '../../types';
import { keygen } from '../../utils/keygen';

interface ReduxProps {
    settings: SettingsType,
}

interface ModalProps {
    children: any,
    items: Array<any>,
    open: boolean,
    onClose: () => void,
    onTagPress: (key: string) => void,
    selected: number,
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
                    style={{ alignItems: 'center', display: 'flex' }}
                >
                    <View style={{ ...MSMStyles.rootContainer, backgroundColor: this.props.settings.colorScheme.backgroundC }}>
                        {this.props.items.map((item, index) => {
                            return (
                                <View key={keygen()} style={MSMStyles.itemContainer}>
                                    <Icon
                                        color={this.props.selected === index ? this.props.settings.colorScheme.textC : 'transparent'}
                                        name={'chevron-right'}
                                        size={30}
                                    />
                                    <TouchableOpacity onPress={() => this.props.onTagPress(`tag:${index}`)} style={MSMStyles.itemWrapper}>
                                        {item}
                                    </TouchableOpacity>
                                    <Icon
                                        color={this.props.selected === index ? this.props.settings.colorScheme.textC : 'transparent'}
                                        name={'chevron-left'}
                                        size={30}
                                    />
                                </View>
                            );
                        })}
                    </View>
                </Modal>
            </>
        );
    }
}

const mapStateToProps = (state: ReduxProps) => ({
    settings: state.settings,
});

export default connect(mapStateToProps)(RecordInputModal);
