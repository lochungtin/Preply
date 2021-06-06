import { DrawerNavigationProp } from '@react-navigation/drawer';
import React from 'react';
import { ScrollView, View, } from 'react-native';
import { connect } from 'react-redux';

import Header from '../Components/Header';
import RecordHandler from '../Components/RecordHandler';
import SeparatorLine from '../Components/SeparatorLine';
import RecordItem from '../Components/RecordItem';

import { theme } from '../data/colors';
import { ScreenStyles, screenWidth } from './styles';

import { NoteType } from '../types';
import { store } from '../redux/store';
import { deleteNote } from '../redux/action';

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

	render() {
		return (
			<View style={{ ...ScreenStyles.screenD, backgroundColor: theme.backgroundC }}>
				<Header nav={this.props.navigation} title={"Notes"} />
				<RecordHandler
					isFiltering={this.state.filtering}
					isSorting={this.state.sorting}
					onAdd={() => this.setState({ inputModalOpen: true })}
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
								onPress={recordKey => console.log(recordKey)}								
								record={note}
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
