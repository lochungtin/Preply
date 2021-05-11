import { DrawerNavigationProp } from '@react-navigation/drawer';
import React from 'react';
import { Text, TouchableOpacity, View, } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { connect } from 'react-redux';

import { SettingsType } from '../../types';

import { HeaderStyles } from './styles';

interface NavProps {
	navigation: DrawerNavigationProp<any, any>
}

interface ReduxProps {
	settings: SettingsType,
}

interface BarProps {
	title: string,
}

class SeparatorLine extends React.Component<NavProps & ReduxProps & BarProps> {
	render() {
		console.log(this.props);

		return (
			<View style={{ ...HeaderStyles.rootContainer, backgroundColor: this.props.settings.colorScheme.headerC }}>
				<TouchableOpacity onPress={() => this.props.navigation.openDrawer()}>
					<Icon
						color={this.props.settings.colorScheme.textC}
						name='menu-open'
						size={35}
					/>
				</TouchableOpacity>
				<Text style={{ ...HeaderStyles.title, color: this.props.settings.colorScheme.textC }}>
					{this.props.title}
				</Text>
			</View>
		);
	}
}

const mapStateToProps = (state: ReduxProps) => ({
	settings: state.settings
});

export default connect(mapStateToProps)(SeparatorLine);