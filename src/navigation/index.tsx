import React from 'react';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar, Text, View, } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { connect } from 'react-redux';

import { SettingsType } from '../types';
import TodoScreen from '../screens/TodoScreen';
import NoteScreen from '../screens/NoteScreen';
import RoutineScreen from '../screens/RoutineScreen';
import CalculatorScreen from '../screens/CalculatorScreen';
import ConverterScreen from '../screens/ConverterScreen';
import SettingsScreen from '../screens/SettingsScreen';
import AccountScreen from '../screens/AccountScreen';
import SeparatorLine from '../Components/SeparatorLine';

import { NavStyles } from './styles';

interface ReduxProps {
	settings: SettingsType,
}

const RootNav = createDrawerNavigator();

class AppNav extends React.Component<ReduxProps> {
	drawerContent = (props: any) =>
		<DrawerContentScrollView {...props} style={{ backgroundColor: this.props.settings.colorScheme.drawerBgC }}>
			<View style={{ height: 20 }} />
			<Text style={{ ...NavStyles.main, color: this.props.settings.colorScheme.textC }}>
				Preply
			</Text>
			<SeparatorLine width={240} style={{ marginLeft: 15 }} />
			<DrawerItem
				icon={props => <Icon
					color={this.props.settings.colorScheme.drawerIconC}
					name='format-list-checks'
					size={props.size}
				/>}
				label="To-Dos"
				labelStyle={{ color: this.props.settings.colorScheme.textC }}
				onPress={() => props.navigation.navigate('todos')}
			/>
			<DrawerItem
				icon={props => <Icon
					color={this.props.settings.colorScheme.drawerIconC}
					name='text-box-outline'
					size={props.size}
				/>}
				label="Notes"
				labelStyle={{ color: this.props.settings.colorScheme.textC }}
				onPress={() => props.navigation.navigate('notes')}
			/>
			<DrawerItem
				icon={props => <Icon
					color={this.props.settings.colorScheme.drawerIconC}
					name='clock-outline'
					size={props.size}
				/>}
				label="Routines"
				labelStyle={{ color: this.props.settings.colorScheme.textC }}
				onPress={() => props.navigation.navigate('routines')}
			/>
			<Text style={{ ...NavStyles.title, color: this.props.settings.colorScheme.textC }}>
				Utilities
			</Text>
			<SeparatorLine width={240} style={{ marginLeft: 15 }} />
			<DrawerItem
				icon={props => <Icon
					color={this.props.settings.colorScheme.drawerIconC}
					name='calculator-variant'
					size={props.size}
				/>}
				label="Calculator"
				labelStyle={{ color: this.props.settings.colorScheme.textC }}
				onPress={() => props.navigation.navigate('calculator')}
			/>
			<DrawerItem
				icon={props => <Icon
					color={this.props.settings.colorScheme.drawerIconC}
					name='swap-horizontal'
					size={props.size} />}
				label="Unit Converter"
				labelStyle={{ color: this.props.settings.colorScheme.textC }}
				onPress={() => props.navigation.navigate('converter')}
			/>
			<Text style={{ ...NavStyles.title, color: this.props.settings.colorScheme.textC }}>
				Settings
			</Text>
			<SeparatorLine width={240} style={{ marginLeft: 15 }} />
			<DrawerItem
				icon={props => <Icon
					color={this.props.settings.colorScheme.drawerIconC}
					name='account'
					size={props.size}
				/>}
				label="Account"
				labelStyle={{ color: this.props.settings.colorScheme.textC }}
				onPress={() => props.navigation.navigate('account')}
			/>
			<DrawerItem
				icon={props => <Icon
					color={this.props.settings.colorScheme.drawerIconC}
					name='cog'
					size={props.size}
				/>}
				label="Settings"
				labelStyle={{ color: this.props.settings.colorScheme.textC }}
				onPress={() => props.navigation.navigate('settings')}
			/>
		</DrawerContentScrollView>

	render() {
		return (
			<NavigationContainer>
				<StatusBar backgroundColor={this.props.settings.colorScheme.backgroundC} />
				<RootNav.Navigator drawerContent={this.drawerContent}>
					<RootNav.Screen component={TodoScreen} name='todos' />
					<RootNav.Screen component={NoteScreen} name='notes' />
					<RootNav.Screen component={RoutineScreen} name='routines' />
					<RootNav.Screen component={CalculatorScreen} name='calculator' />
					<RootNav.Screen component={ConverterScreen} name='converter' />
					<RootNav.Screen component={AccountScreen} name='account' />
					<RootNav.Screen component={SettingsScreen} name='settings' />
				</RootNav.Navigator>
			</NavigationContainer>
		);
	}
}

const mapStateToProps = (state: ReduxProps) => ({
	settings: state.settings,
});

export default connect(mapStateToProps)(AppNav);
