import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'react-native';
import { connect } from 'react-redux';

import { SettingsType } from '../types';
import TodoScreen from '../screens/TodoScreen';
import NoteScreen from '../screens/NoteScreen';
import RoutineScreen from '../screens/RoutineScreen';
import CalculatorScreen from '../screens/CalculatorScreen';
import ConverterScreen from '../screens/ConverterScreen';
import SettingsScreen from '../screens/SettingsScreen';

interface ReduxProps {
	settings: SettingsType,
}

const RootNav = createDrawerNavigator();

class AppNav extends React.Component<ReduxProps> {
	render() {
		return (
			<NavigationContainer>
				<StatusBar backgroundColor="#e0e0e0" />
				<RootNav.Navigator>
					<RootNav.Screen name="To-Dos" component={TodoScreen} />
					<RootNav.Screen name="Notes" component={NoteScreen} />
					<RootNav.Screen name="Routines" component={RoutineScreen} />
					<RootNav.Screen name="Calculator" component={CalculatorScreen} />
					<RootNav.Screen name="Unit Converter" component={ConverterScreen} />
					<RootNav.Screen name="Settings" component={SettingsScreen} />
				</RootNav.Navigator>
			</NavigationContainer>
		);
	}
}

const mapStateToProps = (state: ReduxProps) => ({
    settings: state.settings,
});

export default connect(mapStateToProps)(AppNav);
