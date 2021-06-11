import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { theme } from '../../data/colors';
import { RecordItemStyles } from './styles';

import { tags } from '../../data/tags';
import { NoteType, TodoType } from '../../types';

interface RecordProps {
    trash?: boolean
    onPress: (recordKey: string) => void,
    onIconPress: (recordKey: string) => void,
    record: NoteType | TodoType,
}

export default class RecordItem extends React.Component<RecordProps> {
    render() {
        return (
            <TouchableOpacity onPress={() => this.props.onPress(this.props.record.key)} style={{ ...RecordItemStyles.rootContainer, backgroundColor: theme.recordBgC }}>
                <View style={{ ...RecordItemStyles.colorIndicator, backgroundColor: tags.find(tag => tag.key === this.props.record.tagKey)?.color }} />
                <Text style={{ ...RecordItemStyles.titleText, color: theme.textC }}>
                    {this.props.record.title}
                </Text>
                <TouchableOpacity onPress={() => this.props.onIconPress(this.props.record.key)} style={RecordItemStyles.checkbox}>
                    <Icon
                        color={theme.recordBtnC}
                        name={this.props.trash ? 'trash-can-outline' : 'check'}
                        size={35}
                    />
                </TouchableOpacity>
            </TouchableOpacity>
        );
    }
}
