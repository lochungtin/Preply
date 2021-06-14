import { DrawerNavigationProp } from '@react-navigation/drawer';
import moment from 'moment';
import React from 'react';
import { ScrollView, View } from 'react-native';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import { connect } from 'react-redux';

import Header from '../components/Header';
import MultiSelectModal from '../components/MultiSelectModal';
import RecordHandler from '../components/RecordHandler';
import RecordItem from '../components/RecordItem';
import SeparatorLine from '../components/SeparatorLine';
import Tag from '../components/Tag';

import { theme } from '../data/colors';
import { ScreenStyles, screenWidth } from './styles';

import { tags } from '../data/tags';
import { firebaseAddNote, firebaseDeleteNote } from '../firebase/data';
import { addNote, deleteNote } from '../redux/action';
import { store } from '../redux/store';
import { AccountType, NoteMap, NoteType, TagType } from '../types';
import { keygen } from '../utils/keygen';

interface NavProps {
	navigation: DrawerNavigationProp<any, any>,
}

interface ReduxProps {
	account: AccountType,
	notes: NoteMap,
}

class Screen extends React.Component<NavProps & ReduxProps> {

	state = {
		filter: tags.length,
		openFilterPicker: false,
		sorting: false,
		undoStack: [],
	}

	createEmptyNote = () => {
		let now: string = moment().format('YYYY-MM-DD HH:mm:ss');
		let payload: NoteType = {
			content: '',
			meta: {
				creation: now,
				modified: now,
			},
			key: keygen(),
			tagKey: 'tag:0',
			title: 'New Note',
		};

		store.dispatch(addNote(payload));
		if (this.props.account !== null)
			firebaseAddNote(this.props.account.uid, payload);
	}

	delete = (note: NoteType) => {
		store.dispatch(deleteNote(note.key));
		if (this.props.account !== null)
			firebaseDeleteNote(this.props.account.uid, note.key);

		this.setState({ undoStack: [note, ...this.state.undoStack] });
	}

	undo = () => {
		if (this.state.undoStack.length !== 0) {
			let payload: NoteType = this.state.undoStack[0];

			store.dispatch(addNote(payload));
			if (this.props.account !== null)
				firebaseAddNote(this.props.account.uid, payload);

			this.setState({ undoStack: this.state.undoStack.slice(1) });
		}
	}

	render() {
		let notes: Array<NoteType> = Object.keys(this.props.notes).map((key: string) => this.props.notes[key]);

		if (this.state.sorting)
			notes.sort((a, b) => parseInt(a.tagKey.substring(4)) - parseInt(b.tagKey.substring(4)));

		if (this.state.filter !== tags.length)
			notes = notes.filter(note => note.tagKey === 'tag:' + this.state.filter);

		return (
			<View style={{ ...ScreenStyles.screenD, backgroundColor: theme.backgroundC }}>
				<Header nav={this.props.navigation} title={"Notes"} />
				<RecordHandler
					canUndo={this.state.undoStack.length !== 0}
					isFiltering={this.state.filter !== tags.length}
					isSorting={this.state.sorting}
					onAdd={this.createEmptyNote}
					toggleFilter={() => this.setState({ openFilterPicker: true })}
					toggleSort={() => this.setState({ sorting: !this.state.sorting })}
					undo={this.undo}
				/>
				<SeparatorLine width={screenWidth * 0.95} style={{ marginTop: 5 }} />
				<ScrollView>
					<View style={ScreenStyles.scrollView}>
						{notes.map((note: NoteType) => {
							return (
								<Swipeable key={note.key}
									renderLeftActions={() => <View style={{ width: screenWidth }} />}
									onSwipeableLeftOpen={() => this.delete(note)}
								>
									<RecordItem
										key={note.key}
										onIconPress={() => this.delete(note)}
										onPress={() => this.props.navigation.navigate('noteEdit', note)}
										record={note}
										trash
									/>
								</Swipeable>
							);
						})}
					</View>
				</ScrollView>
				<MultiSelectModal
					items={[
						...tags.map((tag: TagType) => <Tag {...tag} width={150} />),
						<Tag color={theme.textC} key={`tag:${tags.length}`} name='No Filter' width={150} />
					]}
					onClose={() => this.setState({ openFilterPicker: false })}
					onItemPress={filter => this.setState({ filter, openFilterPicker: false })}
					open={this.state.openFilterPicker}
					selected={this.state.filter}
				/>
			</View>
		);
	}
}

const mapStateToProps = (state: ReduxProps) => ({
	account: state.account,
	notes: state.notes,
});

export default connect(mapStateToProps)(Screen);
