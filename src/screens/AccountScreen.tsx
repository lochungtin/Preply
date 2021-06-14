import { DrawerNavigationProp } from '@react-navigation/drawer';
import React from 'react';
import { LogBox, TouchableOpacity, Text, View, ScrollView } from 'react-native';
import { connect } from 'react-redux';

import AccountItemSeparator from '../components/AccountItemSeparator';
import AccountTextInput from '../components/AccountTextInput';
import ConfirmBtn from '../components/ConfirmBtn';
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
				<ScrollView showsVerticalScrollIndicator={false}>
					<View style={ScreenStyles.scrollView}>
						<AccountItemSeparator iconName='logout' text='Sign Out' />
						<ConfirmBtn onPress={this.signOut} text='Sign Out' />

						<AccountItemSeparator iconName='sync' text='Data Sync' />
						<ConfirmBtn onPress={() => { }} text='Sync Now' />

						<AccountItemSeparator iconName='form-textbox-password' text='Password' />
						<AccountTextInput
							hidden
							placeholder='Current password'
							onChangeText={text => console.log(text)}
						/>
						<AccountTextInput
							hidden
							placeholder='New password'
							onChangeText={text => console.log(text)}
						/>
						<AccountTextInput
							hidden
							placeholder='Reenter new password'
							onChangeText={text => console.log(text)}
						/>
						<View style={{ height: 30 }} />
						<ConfirmBtn onPress={() => { }} text='Update Password' />
					</View>
				</ScrollView>
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
