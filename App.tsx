
import React from 'react';
import { StatusBar, Text, View, } from 'react-native';

export default class App extends React.Component {
	render() {
		return (
			<View>
				<StatusBar
					backgroundColor="#0e0e0e"
				/>
				<Text>
					kill me
				</Text>
			</View>
		);
	}
}
