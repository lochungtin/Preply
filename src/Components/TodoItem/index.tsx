import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { theme } from '../../data/colors';
import { RecordItemStyles } from './styles';

import { tags } from '../../data/tags';
import { deleteTodo } from '../../redux/action';
import { store } from '../../redux/store';
import { TodoType } from '../../types';

interface RecordProps {
    onPress: (recordKey: string) => void,
}

export default class RecordItem extends React.Component<TodoType & RecordProps> {
    render() {
        return (
            <TouchableOpacity onPress={() => this.props.onPress(this.props.tagKey)} style={{ ...RecordItemStyles.rootContainer, backgroundColor: theme.recordBgC }}>
                <View style={{ ...RecordItemStyles.colorIndicator, backgroundColor: tags.find(tag => tag.key === this.props.tagKey)?.color }} />
                <Text style={{ ...RecordItemStyles.titleText, color: theme.textC }}>
                    {this.props.title}
                </Text>
                <TouchableOpacity onPress={() => store.dispatch(deleteTodo(this.props.tagKey))} style={RecordItemStyles.checkbox}>
                    <Icon
                        color={theme.recordBtnC}
                        name='check'
                        size={35}
                    />
                </TouchableOpacity>
            </TouchableOpacity>
        );
    }
}
