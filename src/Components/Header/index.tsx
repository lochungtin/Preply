import { DrawerNavigationProp } from '@react-navigation/drawer';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { theme } from '../../data/colors';
import { HeaderStyles } from './styles';

interface NavProps {
	nav: DrawerNavigationProp<any, any>
}

interface BarProps {
	backMode?: boolean,
	title: string,
}

export default class Header extends React.Component<NavProps & BarProps> {

	onPress = () => {
		if (this.props.backMode)
			this.props.nav.goBack();
		else
			this.props.nav.openDrawer();
	}

	render() {
		return (
			<View style={{ ...HeaderStyles.rootContainer, backgroundColor: theme.headerC }}>
				<TouchableOpacity onPress={this.onPress}>
					<Icon
						color={theme.textC}
						name={this.props.backMode ? 'chevron-left' : 'menu-open'}
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
