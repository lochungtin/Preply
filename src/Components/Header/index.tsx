import { DrawerNavigationProp } from '@react-navigation/drawer';
import React from 'react';
import { Text, TouchableOpacity, View, } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { theme } from '../../data/colors';
import { HeaderStyles } from './styles';

interface NavProps {
	nav: DrawerNavigationProp<any, any>
}

interface BarProps {
	title: string,
}

export default class Header extends React.Component<NavProps & BarProps> {
	render() {
		return (
			<View style={{ ...HeaderStyles.rootContainer, backgroundColor: theme.headerC }}>
				<TouchableOpacity onPress={this.props.nav.openDrawer}>
					<Icon
						color={theme.textC}
						name='menu-open'
						size={35}
					/>
				</TouchableOpacity>
				<Text style={{ ...HeaderStyles.title, color: theme.textC }}>
					{this.props.title}
				</Text>
			</View>
		);
	}
}
