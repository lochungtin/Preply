import React from 'react';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar, Text, View } from 'react-native';
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

interface ReduxProps {
	settings: SettingsType,
}

const RootNav = createDrawerNavigator();

class AppNav extends React.Component<ReduxProps> {
	drawerContent = (props: any) =>
		<DrawerContentScrollView {...props}>
			<Text>
				Preply
			</Text>
			<DrawerItem
				icon={props => <Icon color={props.color} name='format-list-checks' size={props.size} />}
				label="To-Dos"
				onPress={() => props.navigation.navigate('todos')}
			/>
			<DrawerItem
				icon={props => <Icon color={props.color} name='text-box-outline' size={props.size} />}
				label="Notes"
				onPress={() => props.navigation.navigate('notes')}
			/>
			<DrawerItem
				icon={props => <Icon color={props.color} name='clock-outline' size={props.size} />}
				label="Routines"
				onPress={() => props.navigation.navigate('routines')}
			/>
			<Text>
				Utilities
			</Text>
			<DrawerItem
				icon={props => <Icon color={props.color} name='calculator-variant' size={props.size} />}
				label="Calculator"
				onPress={() => props.navigation.navigate('calculator')}
			/>
			<DrawerItem
				icon={props => <Icon color={props.color} name='swap-horizontal' size={props.size} />}
				label="Unit Converter"
				onPress={() => props.navigation.navigate('converter')}
			/>
			<Text>
				Others
			</Text>
			<DrawerItem
				icon={props => <Icon color={props.color} name='account' size={props.size} />}
				label="Account"
				onPress={() => props.navigation.navigate('account')}
			/>
			<DrawerItem
				icon={props => <Icon color={props.color} name='cog' size={props.size} />}
				label="Settings"
				onPress={() => props.navigation.navigate('settings')}
			/>
		</DrawerContentScrollView>

	render() {
		return (
			<NavigationContainer>
				<StatusBar backgroundColor='#0e0e0e' />
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
