import { DrawerNavigationProp } from '@react-navigation/drawer';
import React from 'react';
import { LogBox, TouchableOpacity, Text, View, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { connect } from 'react-redux';

import AccountItemSeparator from '../components/AccountItemSeparator';
import AccountTextInput from '../components/AccountTextInput';
import ConfirmBtn from '../components/ConfirmBtn';
import Header from '../components/Header';
import MultiSelectModal from '../components/MultiSelectModal';

import { theme } from '../data/colors';
import { AccountScreenStyles, ScreenStyles } from './styles';

import { changePswd, signOut } from '../firebase/auth';
import { firebaseDefaultErrorCallback, firebaseFetchAll, firebaseOverwriteUserData } from '../firebase/data';
import { overwriteNotes, overwriteTodos, signOutRedux, updateSyncOption } from '../redux/action';
import { store } from '../redux/store';
import { AccountType, NoteMap, SyncOptionType, TodoMap } from '../types';
import { FullSnapshotType, MergeType } from '../types/firebaseTypes';
import { merge } from '../utils/merger';
import { syncOptions } from '../data/dataSync';
import { showMessage } from 'react-native-flash-message';


LogBox.ignoreLogs(['AsyncStorage has been']);

interface NavProps {
	navigation: DrawerNavigationProp<any, any>,
}

interface ReduxProps {
	account: AccountType,
	notes: NoteMap,
	syncOp: SyncOptionType,
	todos: TodoMap,
}

class Screen extends React.Component<NavProps & ReduxProps> {

	state = {
		curPswd: '',
		email: '',
		openSyncOpPicker: false,
		pswd: '',
		rPswd: '',
	}

	overwriteCloudStore = () =>
		firebaseOverwriteUserData(this.props.account.uid, { notes: this.props.notes, todos: this.props.todos });

	overwriteLocalStore = () => {
		firebaseFetchAll(this.props.account.uid)
			.then((snapshot: FullSnapshotType) => {
				if (snapshot) {
					store.dispatch(overwriteNotes(snapshot.notes || {}));
					store.dispatch(overwriteTodos(snapshot.todos || {}));
				}
			})
			.catch(firebaseDefaultErrorCallback);
	}

	mergeLocalWithFirebase = () => {
		firebaseFetchAll(this.props.account.uid)
			.then((snapshot: FullSnapshotType) => {
				if (!snapshot)
					this.overwriteCloudStore();
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

	signOut = () => {
		store.dispatch(signOutRedux());
		signOut();
	}

	sync = () => {
		switch (this.props.syncOp.key) {
			case 'syn:1':
				this.overwriteCloudStore();
				break;
			case 'syn:2':
				this.overwriteLocalStore();
				break;
			default:
				this.mergeLocalWithFirebase();
		}
	}

	updatePswd = () => {
		if (!this.state.pswd)
			return showMessage({
				backgroundColor: theme.modalBgC,
				color: theme.accent,
				message: 'A password is required',
			});

		if (this.state.pswd !== this.state.rPswd)
			return showMessage({
				backgroundColor: theme.modalBgC,
				color: theme.accent,
				message: `New passwords don't match`,
			});

		if (this.state.pswd.length < 6)
			return showMessage({
				backgroundColor: theme.modalBgC,
				color: theme.accent,
				message: 'Password must have 6+ characters',
			});

		changePswd(this.props.account.email, this.state.curPswd, this.state.pswd)
			.then(() => showMessage({
				backgroundColor: theme.accent,
				color: theme.modalBgC,
				message: 'Password change successful',
			}))
			.catch(err => {
				console.log(err.code);

				let message: string;
				let description: string | undefined;

				switch (err.code) {
					case 'auth/wrong-password':
						message = 'Password entered is incorrect';
						break;
					default:
						message = err.toString();
						description = err.toString();
				}

				showMessage({
					description,
					message,
					backgroundColor: theme.modalBgC,
					color: theme.accent,
				});
			});
	}

	updateSyncOp = (index: number) => {
		store.dispatch(updateSyncOption(syncOptions[index]));
		this.setState({ openSyncOpPicker: false });
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
						<ConfirmBtn onPress={this.sync} text='Sync Now' />
						<View style={{ height: 30 }} />
						<View style={AccountScreenStyles.syncMethodContainer}>
							<Icon
								color={theme.textC}
								name='chevron-right'
								size={30}
							/>
							<Text style={{ ...AccountScreenStyles.syncMethodLabel, color: theme.textC }}>
								Sync Method
							</Text>
						</View>
						<MultiSelectModal
							items={syncOptions.map((option: SyncOptionType) => {
								return (
									<Text key={option.key} style={{ color: this.props.syncOp.key === option.key ? theme.accent : theme.textC }}>
										{option.name}
									</Text>
								);
							})}
							onClose={() => this.setState({ openSyncOpPicker: false })}
							onItemPress={this.updateSyncOp}
							open={this.state.openSyncOpPicker}
							selected={parseInt(this.props.syncOp.key.substring(4))}
						>
							<View style={AccountScreenStyles.syncMethodContainer}>
								<Text style={{ ...AccountScreenStyles.syncMethodText, color: theme.accent }}>
									{this.props.syncOp.name}
								</Text>
								<TouchableOpacity onPress={() => this.setState({ openSyncOpPicker: true })} style={{ ...AccountScreenStyles.syncMethodBtn, borderColor: theme.accent }}>
									<Text style={{ color: theme.textC }}>
										Change
									</Text>
								</TouchableOpacity>
							</View>
						</MultiSelectModal>

						<AccountItemSeparator iconName='form-textbox-password' text='Password' />
						<AccountTextInput
							hidden
							placeholder='Current password'
							onChangeText={curPswd => this.setState({ curPswd })}
						/>
						<AccountTextInput
							hidden
							placeholder='New password'
							onChangeText={pswd => this.setState({ pswd })}
						/>
						<AccountTextInput
							hidden
							placeholder='Reenter new password'
							onChangeText={rPswd => this.setState({ rPswd })}
						/>
						<View style={{ height: 30 }} />
						<ConfirmBtn onPress={this.updatePswd} text='Update Password' />
					</View>
				</ScrollView>
			</View>
		);
	}
}

const mapStateToProps = (state: ReduxProps) => ({
	account: state.account,
	notes: state.notes,
	syncOp: state.syncOp,
	todos: state.todos,
});

export default connect(mapStateToProps)(Screen);
