import { DrawerNavigationProp } from '@react-navigation/drawer';
import moment from 'moment';
import React from 'react';
import { ScrollView, View } from 'react-native';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import { connect } from 'react-redux';

import Header from '../Components/Header';
import MultiSelectModal from '../Components/MultiSelectModal';
import RecordHandler from '../Components/RecordHandler';
import RecordItem from '../Components/RecordItem';
import SeparatorLine from '../Components/SeparatorLine';
import Tag from '../Components/Tag';

import { theme } from '../data/colors';
import { ScreenStyles, screenWidth } from './styles';

import { tags } from '../data/tags';
import { addNote, deleteNote } from '../redux/action';
import { store } from '../redux/store';
import { NoteMap, NoteType, TagType } from '../types';
import { keygen } from '../utils/keygen';

interface NavProps {
	navigation: DrawerNavigationProp<any, any>,
}

interface ReduxProps {
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
		let now: string = moment().format('DD-MM-YYYY-HH:mm:ss');
		store.dispatch(addNote({
			content: '',
			meta: {
				creation: now,
				modified: now,
			},
			key: keygen(),
			tagKey: 'tag:0',
			title: 'New Note',
		}));
	}

	delete = (note: NoteType) => {
		store.dispatch(deleteNote(note.key));
		this.setState({ undoStack: [note, ...this.state.undoStack] });
	}

	undo = () => {
		if (this.state.undoStack.length !== 0) {
			store.dispatch(addNote(this.state.undoStack[0]));
			this.setState({ undoStack: this.state.undoStack.slice(1) });
		}
	}

	render() {
		let notes: Array<NoteType> = Object.keys(this.props.notes).map(key => this.props.notes[key]);

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
	notes: state.notes,
});

export default connect(mapStateToProps)(Screen);
