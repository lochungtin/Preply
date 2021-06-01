import { createDrawerNavigator, DrawerContentScrollView, DrawerItem, DrawerNavigationProp, } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
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
import InputRecordScreen from '../screens/InputRecordScreen';
	
interface ReduxProps {
	settings: SettingsType,
}

const RootNav = createDrawerNavigator();
const TodoNav = createStackNavigator();
const NoteNav = createStackNavigator();
const RoutineNav = createStackNavigator();

const todo = (navigation: DrawerNavigationProp<any, any>) =>
	<TodoNav.Navigator screenOptions={{ headerShown: false }}>
		<TodoNav.Screen component={TodoScreen} name='todos' />
		<TodoNav.Screen component={InputRecordScreen} name='input' />
	</TodoNav.Navigator>

const note = () =>
	<NoteNav.Navigator screenOptions={{ headerShown: false }}>
		<NoteNav.Screen component={NoteScreen} name='notes' />
		<NoteNav.Screen component={InputRecordScreen} name='input' />
	</NoteNav.Navigator>

const routine = () =>
	<RoutineNav.Navigator screenOptions={{ headerShown: false }}>
		<RoutineNav.Screen component={RoutineScreen} name='routines' />
		<RoutineNav.Screen component={InputRecordScreen} name='input' />
	</RoutineNav.Navigator>

class AppNav extends React.Component<ReduxProps> {
	drawerContent = (props: any) =>
		<DrawerContentScrollView {...props} style={{ backgroundColor: this.props.settings.colorScheme.backgroundC }}>
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
					<RootNav.Screen component={todo} name='todos' />
					<RootNav.Screen component={note} name='notes' />
					<RootNav.Screen component={routine} name='routines' />
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
