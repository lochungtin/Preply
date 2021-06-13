import { DrawerNavigationProp } from '@react-navigation/drawer';
import React from 'react';
import { TouchableOpacity, Text, View } from 'react-native';
import { connect } from 'react-redux';

import Header from '../components/Header';

import { theme } from '../data/colors';
import { ScreenStyles } from './styles';

import { firebaseDefaultErrorCallback, firebaseFetchAll, firebaseFetchKeylist } from '../firebase/data';
import firebaseConfig from '../firebase/config';
import { overwriteNotes, overwriteTodos, signOutRedux } from '../redux/action';
import { store } from '../redux/store';
import { AccountType } from '../types';
import { FullSnapshotType } from '../types/firebaseTypes';


interface NavProps {
	navigation: DrawerNavigationProp<any, any>,
}

interface ReduxProps {
	account: AccountType,
}

class Screen extends React.Component<NavProps & ReduxProps> {

	signOut = () => {
		store.dispatch(signOutRedux())
	}

	overwriteLocalStore = () => {
		firebaseFetchAll(this.props.account.uid)
			.then((snapshot: firebaseConfig.database.DataSnapshot) => {
				let data: FullSnapshotType = snapshot.val();

				store.dispatch(overwriteNotes(data.notes || {}));
				store.dispatch(overwriteTodos(data.todos || {}));
			})
			.catch(firebaseDefaultErrorCallback);
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
			</View>
		);
	}
}

const mapStateToProps = (state: ReduxProps) => ({
	account: state.account,
});

export default connect(mapStateToProps)(Screen);
