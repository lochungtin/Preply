import { createDrawerNavigator, DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { StatusBar, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import SeparatorLine from '../Components/SeparatorLine';
import AccountScreen from '../screens/AccountScreen';
import CalculatorScreen from '../screens/CalculatorScreen';
import ConverterScreen from '../screens/ConverterScreen';
import NoteEditScreen from '../screens/NoteEditScreen';
import NoteScreen from '../screens/NoteScreen';
import TodoScreen from '../screens/TodoScreen';

import { theme } from '../data/colors';
import { NavStyles } from './styles';

const RootNav = createDrawerNavigator();
const NoteNav = createStackNavigator();

const note = () =>
	<NoteNav.Navigator screenOptions={{ headerShown: false }}>
		<NoteNav.Screen component={NoteScreen} name='notes' />
		<NoteNav.Screen component={NoteEditScreen} name='noteEdit' />
	</NoteNav.Navigator>

export default class AppNav extends React.Component {
	drawerContent = (props: any) =>
		<DrawerContentScrollView {...props} style={{ backgroundColor: theme.backgroundC }}>
			<View style={{ height: 20 }} />
			<Text style={{ ...NavStyles.main, color: theme.textC }}>
				Preply
			</Text>
			<SeparatorLine width={240} style={{ marginLeft: 15 }} />
			<DrawerItem
				icon={props => <Icon
					color={theme.drawerIconC}
					name='format-list-checks'
					size={props.size}
				/>}
				label="To-Dos"
				labelStyle={{ color: theme.textC }}
				onPress={() => props.navigation.navigate('todos')}
			/>
			<DrawerItem
				icon={props => <Icon
					color={theme.drawerIconC}
					name='text-box-outline'
					size={props.size}
				/>}
				label="Notes"
				labelStyle={{ color: theme.textC }}
				onPress={() => props.navigation.navigate('notes')}
			/>
			<Text style={{ ...NavStyles.title, color: theme.textC }}>
				Utilities
			</Text>
			<SeparatorLine width={240} style={{ marginLeft: 15 }} />
			<DrawerItem
				icon={props => <Icon
					color={theme.drawerIconC}
					name='calculator-variant'
					size={props.size}
				/>}
				label="Calculator"
				labelStyle={{ color: theme.textC }}
				onPress={() => props.navigation.navigate('calculator')}
			/>
			<DrawerItem
				icon={props => <Icon
					color={theme.drawerIconC}
					name='swap-horizontal'
					size={props.size} />}
				label="Unit Converter"
				labelStyle={{ color: theme.textC }}
				onPress={() => props.navigation.navigate('converter')}
			/>
			<Text style={{ ...NavStyles.title, color: theme.textC }}>
				Account
			</Text>
			<SeparatorLine width={240} style={{ marginLeft: 15 }} />
			<DrawerItem
				icon={props => <Icon
					color={theme.drawerIconC}
					name='account'
					size={props.size}
				/>}
				label="Account"
				labelStyle={{ color: theme.textC }}
				onPress={() => props.navigation.navigate('account')}
			/>
		</DrawerContentScrollView>

	render() {
		return (
			<NavigationContainer>
				<StatusBar backgroundColor={theme.backgroundC} />
				<RootNav.Navigator drawerContent={this.drawerContent}>
					<RootNav.Screen component={TodoScreen} name='todos' />
					<RootNav.Screen component={note} name='notes' />
					<RootNav.Screen component={CalculatorScreen} name='calculator' />
					<RootNav.Screen component={ConverterScreen} name='converter' />
					<RootNav.Screen component={AccountScreen} name='account' />
				</RootNav.Navigator>
			</NavigationContainer>
		);
	}
}
