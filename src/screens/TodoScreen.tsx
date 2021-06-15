import { DrawerNavigationProp } from '@react-navigation/drawer';
import React from 'react';
import { ScrollView, View } from 'react-native';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import { ReceivedNotification } from 'react-native-push-notification';
import { connect } from 'react-redux';

import Calendar from '../components/Calendar';
import Header from '../components/Header';
import InputModal from '../components/InputModal';
import MultiSelectModal from '../components/MultiSelectModal';
import RecordHandler from '../components/RecordHandler';
import RecordItem from '../components/RecordItem';
import SeparatorLine from '../components/SeparatorLine';
import Tag from '../components/Tag';

import { theme } from '../data/colors';
import { ScreenStyles, screenWidth } from './styles';

import { tags } from '../data/tags';
import { firebaseAddTodo, firebaseDeleteTodo, firebaseSetTodo } from '../firebase/data';
import { addTodo, deleteTodo } from '../redux/action';
import { store } from '../redux/store';
import { AccountType, TagType, TodoMap, TodoType } from '../types';
import NotifService from '../notification';

interface NavProps {
	navigation: DrawerNavigationProp<any, any>,
}

interface ReduxProps {
	account: AccountType,
	todos: TodoMap,
}

class Screen extends React.Component<NavProps & ReduxProps> {

	notif: NotifService;

    constructor(props: NavProps & ReduxProps) {
        super(props);

        this.notif = new NotifService(
            this.onRegister.bind(this),
            this.onNotif.bind(this),
        );
    }

	state = {
		calendarExpand: false,
		date: '',
		inputModalOpen: false,
		filter: tags.length,
		openFilterPicker: false,
		sorting: false,
		todo: undefined,
		undoStack: [],
	}

	delete = (todo: TodoType) => {
		// dispatch to local store and firebase
		store.dispatch(deleteTodo(todo.key));
		if (this.props.account !== null)
			firebaseDeleteTodo(this.props.account.uid, todo.key);

		// handle notifications
		this.notif.cancelNotif(todo.notifID);

		// add to undo stack
		this.setState({ undoStack: [todo, ...this.state.undoStack] });
	}

	onNotif = (notification: Omit<ReceivedNotification, "userInfo">) => { }

    onRegister = (token: { os: string, token: string }) => { }

	toggleCalendarSelect = (date: string) => {
		if (this.state.date === date)
			this.setState({ date: '' });
		else
			this.setState({ date });
	}

	undo = () => {
		if (this.state.undoStack.length !== 0) {
			let payload: TodoType = this.state.undoStack[0];

			store.dispatch(addTodo(payload));
			if (this.props.account !== null)
				firebaseAddTodo(this.props.account.uid, payload);

			if (payload.notif)
				this.notif.scheduleNotif(payload);

			this.setState({ undoStack: this.state.undoStack.slice(1) });
		}
	}

	render() {
		let todos: Array<TodoType> = Object.keys(this.props.todos).map((key: string) => this.props.todos[key]);

		if (this.state.sorting)
			todos.sort((a, b) => parseInt(a.tagKey.substring(4)) - parseInt(b.tagKey.substring(4)));

		if (this.state.filter !== tags.length)
			todos = todos.filter(todo => todo.tagKey === 'tag:' + this.state.filter);

		if (this.state.date)
			todos = todos.filter(todo => todo.date === this.state.date);

		return (
			<View style={{ ...ScreenStyles.screenD, backgroundColor: theme.backgroundC }}>
				<Header nav={this.props.navigation} title={'To Dos'} />
				<RecordHandler
					calendar
					canUndo={this.state.undoStack.length !== 0}
					isCalendarOpen={this.state.calendarExpand}
					isFiltering={this.state.filter !== tags.length}
					isSorting={this.state.sorting}
					onAdd={() => this.setState({ inputModalOpen: true })}
					toggleCalendar={() => this.setState({ calendarExpand: !this.state.calendarExpand })}
					toggleFilter={() => this.setState({ openFilterPicker: true })}
					toggleSort={() => this.setState({ sorting: !this.state.sorting })}
					undo={this.undo}
				/>
				<Calendar
					expand={this.state.calendarExpand}
					onDatePress={this.toggleCalendarSelect}
					toggleExpand={() => this.setState({ calendarExpand: !this.state.calendarExpand })}
					selected={this.state.date}
				/>
				<SeparatorLine width={screenWidth * 0.95} />
				<ScrollView>
					<View style={ScreenStyles.scrollView}>
						{todos.map((todo: TodoType) => {
							return (
								<Swipeable key={todo.key}
									renderLeftActions={() => <View style={{ width: screenWidth }} />}
									onSwipeableLeftOpen={() => this.delete(todo)}
								>
									<RecordItem
										onIconPress={() => this.delete(todo)}
										onPress={() => this.setState({ todo, inputModalOpen: true })}
										record={todo}
									/>
								</Swipeable>
							);
						})}
					</View>
				</ScrollView>
				<InputModal
					onClose={() => this.setState({ inputModalOpen: false, todo: undefined })}
					open={this.state.inputModalOpen}
					record={this.state.todo}
				/>
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
	todos: state.todos,
});

export default connect(mapStateToProps)(Screen);
