import React from 'react';
import { TouchableOpacity, View, } from 'react-native';
import Modal from 'react-native-modal';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { theme } from '../../data/colors';
import { MSMStyles } from './styles';

import { keygen } from '../../utils/keygen';

interface ModalProps {
    children: any,
    items: Array<any>,
    open: boolean,
    onClose: () => void,
    onItemPress: (key: string) => void,
    selected: number,
}

export default class RecordInputModal extends React.Component<ModalProps> {

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
                    <View style={{ ...MSMStyles.rootContainer, backgroundColor: theme.backgroundC }}>
                        {this.props.items.map((item, index) => {
                            return (
                                <View key={keygen()} style={MSMStyles.itemContainer}>
                                    <Icon
                                        color={this.props.selected === index ? theme.textC : 'transparent'}
                                        name={'chevron-right'}
                                        size={30}
                                    />
                                    <TouchableOpacity onPress={() => this.props.onItemPress(index.toString())} style={MSMStyles.itemWrapper}>
                                        {item}
                                    </TouchableOpacity>
                                    <Icon
                                        color={this.props.selected === index ? theme.textC : 'transparent'}
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
