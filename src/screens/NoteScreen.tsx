import { DrawerNavigationProp } from '@react-navigation/drawer';
import React from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';

import Header from '../Components/Header';
import RecordHandler from '../Components/RecordHandler';

import { ScreenStyles } from './styles';

import { NoteType, SettingsType, } from '../types';

interface NavProps {
	navigation: DrawerNavigationProp<any, any>,
}

interface ReduxProps {
    notes: Array<NoteType>,
	settings: SettingsType
}

class Screen extends React.Component<NavProps & ReduxProps> {
	render() {
		return (
			<View style={{...ScreenStyles.screenD, backgroundColor: this.props.settings.colorScheme.backgroundC}}>
				<Header nav={this.props.navigation} title={"Notes"} />
				<RecordHandler nav={this.props.navigation} type='Note'/>
			</View>
		);
	}
}

const mapStateToProps = (state: ReduxProps) => ({
    notes: state.notes,
	settings: state.settings,
});

export default connect(mapStateToProps)(Screen);
