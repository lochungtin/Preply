import { DrawerNavigationProp } from '@react-navigation/drawer';
import React from 'react';
import { LogBox, TouchableOpacity, Text, View } from 'react-native';
import { connect } from 'react-redux';

import Header from '../components/Header';

import { theme } from '../data/colors';
import { ScreenStyles } from './styles';

import { signOut } from '../firebase/auth';
import { firebaseDefaultErrorCallback, firebaseFetchAll, firebaseOverwriteUserData } from '../firebase/data';
import firebaseConfig from '../firebase/config';
import { overwriteNotes, overwriteTodos, signOutRedux } from '../redux/action';
import { store } from '../redux/store';
import { AccountType, NoteMap, TodoMap } from '../types';
import { FullSnapshotType, MergeType } from '../types/firebaseTypes';
import { merge } from '../utils/merger';


LogBox.ignoreLogs(['AsyncStorage has been']);

interface NavProps {
	navigation: DrawerNavigationProp<any, any>,
}

interface ReduxProps {
	account: AccountType,
	notes: NoteMap,
	todos: TodoMap,
}

class Screen extends React.Component<NavProps & ReduxProps> {

	signOut = () => {
		store.dispatch(signOutRedux());
		signOut();
	}

	overwriteLocalStore = () => {
		firebaseFetchAll(this.props.account.uid)
			.then((snapshot: firebaseConfig.database.DataSnapshot) => {
				if (snapshot.exists()) {
					let data: FullSnapshotType = snapshot.val();

					store.dispatch(overwriteNotes(data.notes || {}));
					store.dispatch(overwriteTodos(data.todos || {}));
				}
			})
			.catch(firebaseDefaultErrorCallback);
	}

	mergeLocalWithFirebase = () => {
		firebaseFetchAll(this.props.account.uid)
			.then((snapshot: FullSnapshotType) => {
				if (!snapshot)
					firebaseOverwriteUserData(this.props.account.uid, { notes: this.props.notes, todos: this.props.todos });
				else {
					let data: FullSnapshotType = { ...snapshot };
					let combined: MergeType = merge(this.props.notes, this.props.todos, data);

					store.dispatch(overwriteNotes(combined.notes));
					store.dispatch(overwriteTodos(combined.todos));

					firebaseOverwriteUserData(this.props.account.uid, combined);
				}
			})
			.catch(firebaseDefaultErrorCallback)
	}

	render() {
		return (
			<View style={{ ...ScreenStyles.screenD, backgroundColor: theme.backgroundC }}>
				<Header nav={this.props.navigation} title={"Account"} />
				<TouchableOpacity onPress={this.signOut}>
					<Text style={{ color: theme.textC }}>
						Sign Out
					</Text>
				</TouchableOpacity>

				<TouchableOpacity onPress={this.mergeLocalWithFirebase}>
					<Text style={{ color: theme.textC }}>
						update
					</Text>
				</TouchableOpacity>
			</View>
		);
	}
}

const mapStateToProps = (state: ReduxProps) => ({
	account: state.account,
	notes: state.notes,
	todos: state.todos,
});

export default connect(mapStateToProps)(Screen);
