import { DrawerNavigationProp } from '@react-navigation/drawer';
import React from 'react';
import { ScrollView, TouchableOpacity, View } from 'react-native';
import { connect } from 'react-redux';

import Header from '../Components/Header';
import RecordHandler from '../Components/RecordHandler';

import { screenStyles } from './styles';

import { SettingsType, TodoType } from '../types';
import RecordItem from '../Components/RecordItem';

interface NavProps {
	navigation: DrawerNavigationProp<any, any>,
}

interface ReduxProps {
	settings: SettingsType,
	todos: Array<TodoType>,
}

class Screen extends React.Component<NavProps & ReduxProps> {
	render() {
		return (
			<View style={{ ...screenStyles.screenD, backgroundColor: this.props.settings.colorScheme.backgroundC }}>
				<Header nav={this.props.navigation} title={'To Dos'} />
				<RecordHandler nav={this.props.navigation} type='Todo'/>
				<ScrollView>
					<RecordItem />
					<RecordItem />
					<RecordItem />
					<RecordItem />
					<RecordItem />
				</ScrollView>
			</View>
		);
	}
}

const mapStateToProps = (state: ReduxProps) => ({
	settings: state.settings,
	todo: state.todos,
});

export default connect(mapStateToProps)(Screen);
