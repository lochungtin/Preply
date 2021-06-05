import React from 'react';
import { Text, View, } from 'react-native';
import { connect } from 'react-redux';

import { TagStyles } from './styles';

import { SettingsType } from '../../types';

interface ReduxProps {
    settings: SettingsType,
}

interface TagProps {
    color: string,
    name: string,
    width?: number,
}

class Screen extends React.Component<ReduxProps & TagProps> {
    render() {
        return (
            <View style={{ ...TagStyles.rootContainer, borderColor: this.props.color, width: this.props.width }}>
                <View style={{ ...TagStyles.dot, backgroundColor: this.props.color }} />
                <Text style={{ ...TagStyles.text, color: this.props.settings.colorScheme.textC }}>
                    {this.props.name}
                </Text>
            </View>
        );
    }
}

const mapStateToProps = (state: ReduxProps) => ({
    settings: state.settings,
});

export default connect(mapStateToProps)(Screen);
