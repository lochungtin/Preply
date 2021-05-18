import React, { Children, ReactElement } from 'react';
import { Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { connect } from 'react-redux';

import { RecordInputModalStyles } from './styles';

import { SettingsType } from '../../types';

interface ReduxProps {
    settings: SettingsType,
}

interface RowProps {
    children: Array<ReactElement> | ReactElement,
    iconName: string,
}

class InputRow extends React.Component<ReduxProps & RowProps> {
    render() {
        return (
            <View style={RecordInputModalStyles.inputFieldRow}>
                <Icon
                    color={this.props.iconName === 'blank' ? 'transparent' : this.props.settings.colorScheme.textC}
                    name={this.props.iconName}
                    size={30}
                />
                <View style={RecordInputModalStyles.inputContainer}>
                    {this.props.children}
                </View>
            </View>
        );
    }
}

const mapStateToProps = (state: ReduxProps) => ({
    settings: state.settings,
});

export default connect(mapStateToProps)(InputRow);