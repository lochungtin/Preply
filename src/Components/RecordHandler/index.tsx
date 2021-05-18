import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { connect } from 'react-redux';

import { RecordHandlerStyles } from './styles';

import { SettingsType } from '../../types';

interface ReduxProps {
    settings: SettingsType,
}

interface HandlerProps {
    onAdd: () => void,
    type: string,
}

class RecordHandler extends React.Component<ReduxProps & HandlerProps> {
    render() {
        return (
            <View style={RecordHandlerStyles.rootContainer}>
                <TouchableOpacity onPress={this.props.onAdd} style={RecordHandlerStyles.addRecordContainer}>
                    <Icon
                        color={this.props.settings.colorScheme.textC}
                        name='plus'
                        size={30}
                    />
                    <Text style={{ ...RecordHandlerStyles.addRecordText, color: this.props.settings.colorScheme.textC }}>
                        {`New ${this.props.type}`}
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity>
                    <Icon
                        color={this.props.settings.colorScheme.textC}
                        name='sort-ascending'
                        size={25}
                    />
                </TouchableOpacity>
                <TouchableOpacity>
                    <Icon
                        color={this.props.settings.colorScheme.textC}
                        name='filter-variant'
                        size={25}
                    />
                </TouchableOpacity>
            </View>
        );
    }
}

const mapStateToProps = (state: ReduxProps) => ({
    settings: state.settings,
});

export default connect(mapStateToProps)(RecordHandler);
