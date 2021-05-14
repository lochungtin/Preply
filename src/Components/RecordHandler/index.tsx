import { DrawerNavigationProp } from '@react-navigation/drawer';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { connect } from 'react-redux';

import { RecordHandlerStyles } from './styles';

import { SettingsType } from '../../types';

interface NavProps {
    nav: DrawerNavigationProp<any, any>,
}

interface ReduxProps {
    settings: SettingsType,
}

interface HandlerProps {
    type: string,
}

class RecordHandler extends React.Component<NavProps & ReduxProps & HandlerProps> {
    render() {
        return (
            <View style={RecordHandlerStyles.rootContainer}>
                <TouchableOpacity onPress={() => this.props.nav.navigate('input', { type: this.props.type })} style={RecordHandlerStyles.addRecordContainer}>
                    <Icon
                        color={this.props.settings.colorScheme.textC}
                        name='plus'
                        size={35}
                    />
                    <Text style={{ ...RecordHandlerStyles.addRecordText, color: this.props.settings.colorScheme.textC }}>
                        {`New ${this.props.type}`}
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity>
                    <Icon
                        color={this.props.settings.colorScheme.textC}
                        name='sort-ascending'
                        size={35}
                    />
                </TouchableOpacity>
                <TouchableOpacity>
                    <Icon
                        color={this.props.settings.colorScheme.textC}
                        name='filter-variant'
                        size={35}
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
