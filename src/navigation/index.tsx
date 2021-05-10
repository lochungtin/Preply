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
const customContent = (props: any) => {
	return (
		<DrawerContentScrollView {...props}>
			<Text>
				Preply
			</Text>
			<DrawerItem
				label="To-Dos"
				onPress={() => props.navigation.navigate('todos')}
			/>
			<DrawerItem
				label="Notes"
				onPress={() => props.navigation.navigate('notes')}
			/>
			<DrawerItem
				label="Routines"
				onPress={() => props.navigation.navigate('routines')}
			/>
			<Text>Utilities</Text>
			<DrawerItem
				label="Calculator"
				onPress={() => props.navigation.navigate('calculator')}
			/>
			<DrawerItem
				label="Unit Converter"
				onPress={() => props.navigation.navigate('converter')}
			/>
			<Text>Others</Text>
			<DrawerItem
				label="Account"
				onPress={() => props.navigation.navigate('account')}
			/>
			<DrawerItem
				label="Settings"
				onPress={() => props.navigation.navigate('settings')}
			/>
		</DrawerContentScrollView>
	);
}

class AppNav extends React.Component<ReduxProps> {
	render() {
		return (
			<NavigationContainer>
				<StatusBar backgroundColor='#0e0e0e' />
				<RootNav.Navigator drawerContent={customContent}>
					<RootNav.Screen
						component={TodoScreen}
						name='todos'
						options={{}}
					/>
					<RootNav.Screen
						component={NoteScreen}
						name='notes'
						options={{}}
					/>
					<RootNav.Screen
						component={RoutineScreen}
						name='routines'
						options={{}}
					/>
					<RootNav.Screen
						component={CalculatorScreen}
						name='calculator'
						options={{}}
					/>
					<RootNav.Screen
						component={ConverterScreen}
						name='converter'
						options={{}}
					/>
					<RootNav.Screen
						component={AccountScreen}
						name='account'
						options={{}}
					/>
					<RootNav.Screen
						component={SettingsScreen}
						name='settings'
						options={{}}
					/>
				</RootNav.Navigator>
			</NavigationContainer>
		);
	}
}

const mapStateToProps = (state: ReduxProps) => ({
	settings: state.settings,
});

export default connect(mapStateToProps)(AppNav);
