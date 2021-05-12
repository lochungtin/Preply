import { DrawerNavigationProp } from '@react-navigation/drawer';
import React from 'react';
import { View, } from 'react-native';
import { connect } from 'react-redux';

import Header from '../Components/Header';

import { SettingsType, NoteType, } from '../types';

import { screenStyles } from './styles';

interface NavProps {
	navigation: DrawerNavigationProp<any, any>,
}

interface ReduxProps {
    notes: Array<NoteType>,
	settings: SettingsType
}

class AppNav extends React.Component<NavProps & ReduxProps> {
	render() {
		return (
			<View style={{...screenStyles.screenD, backgroundColor: this.props.settings.colorScheme.backgroundC}}>
				<Header navigation={this.props.navigation} title={"Notes"} />
			</View>
		);
	}
}

const mapStateToProps = (state: ReduxProps) => ({
    notes: state.notes,
	settings: state.settings,
});

export default connect(mapStateToProps)(AppNav);
