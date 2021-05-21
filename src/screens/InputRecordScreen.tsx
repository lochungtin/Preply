import { DrawerNavigationProp } from '@react-navigation/drawer';
import React from 'react';
import { TouchableOpacity, View, } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { connect } from 'react-redux';

import { SettingsType } from '../types';

import { ScreenStyles } from './styles';

interface NavProps {
    navigation: DrawerNavigationProp<any, any>,
}

interface ReduxProps {
    settings: SettingsType
}

class AppNav extends React.Component<NavProps & ReduxProps> {
    render() {
        return (
            <View style={{ ...ScreenStyles.screenD, backgroundColor: this.props.settings.colorScheme.backgroundC }}>
                <TouchableOpacity onPress={this.props.navigation.goBack}>
                    <Icon 
                        color={this.props.settings.colorScheme.textC}
                        name='chevron-left'
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

export default connect(mapStateToProps)(AppNav);
