import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { connect } from 'react-redux';

import { RecordItemStyles } from './styles';

import { SettingsType } from '../../types';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';


interface ReduxProps {
    settings: SettingsType,
}

class Screen extends React.Component<ReduxProps> {
    render() {
        return (
            <TouchableOpacity style={{ ...RecordItemStyles.rootContainer, backgroundColor: this.props.settings.colorScheme.recordBgC }}>
                <View style={{ ...RecordItemStyles.colorIndicator, backgroundColor: '#' + Math.floor(Math.random() * 16777215).toString(16) }} />
                <Text style={{ ...RecordItemStyles.titleText, color: this.props.settings.colorScheme.textC }}>
                    Some Text
                </Text>
                <TouchableOpacity style={RecordItemStyles.checkbox}>
                    <Icon
                        color={this.props.settings.colorScheme.recordBtnC}
                        name='check-circle-outline'
                        size={35}
                    />
                </TouchableOpacity>
            </TouchableOpacity>
        );
    }
}

const mapStateToProps = (state: ReduxProps) => ({
    settings: state.settings,
});

export default connect(mapStateToProps)(Screen);
