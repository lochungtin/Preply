import moment from 'moment';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import React from 'react';
import { ScrollView, View } from 'react-native';
import { connect } from 'react-redux';

import Header from '../Components/Header';
import RecordHandler from '../Components/RecordHandler';
import SeparatorLine from '../Components/SeparatorLine';
import RecordItem from '../Components/RecordItem';

import { theme } from '../data/colors';
import { ScreenStyles, screenWidth } from './styles';

import { store } from '../redux/store';
import { addNote, deleteNote } from '../redux/action';
import { NoteType } from '../types';
import { keygen } from '../utils/keygen';

interface NavProps {
	navigation: DrawerNavigationProp<any, any>,
}

interface ReduxProps {
	notes: Array<NoteType>,
}

class Screen extends React.Component<NavProps & ReduxProps> {

	state = {
		filtering: false,
		sorting: false,
	}

	createEmptyNote = () => {
		let now = moment().format('DD-MM-YYYY');
		store.dispatch(addNote({
			content: '',
			date: {
				creation: now,
				modified: now,
			},
			key: keygen(),
			tagKey: 'tag:0',
			title: 'New Note',
		}));
	}

	render() {
		return (
			<View style={{ ...ScreenStyles.screenD, backgroundColor: theme.backgroundC }}>
				<Header nav={this.props.navigation} title={"Notes"} />
				<RecordHandler
					isFiltering={this.state.filtering}
					isSorting={this.state.sorting}
					onAdd={this.createEmptyNote}
					toggleFilter={() => this.setState({ filtering: !this.state.filtering })}
					toggleSort={() => this.setState({ sorting: !this.state.sorting })}
				/>
				<SeparatorLine width={screenWidth * 0.95} style={{ marginTop: 5 }} />
				<ScrollView>
					{this.props.notes.map(note => {
						return (
							<RecordItem
								key={note.key}
								onIconPress={recordKey => store.dispatch(deleteNote(recordKey))}
								onPress={recordKey => this.props.navigation.navigate('noteEdit', note)}								
								record={note}
								trash
							/>
						);
					})}
				</ScrollView>
			</View>
		);
	}
}

const mapStateToProps = (state: ReduxProps) => ({
	notes: state.notes,
});

export default connect(mapStateToProps)(Screen);
