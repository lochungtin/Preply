import { DrawerNavigationProp } from '@react-navigation/drawer';
import React from 'react';
import { ScrollView, View } from 'react-native';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import { connect } from 'react-redux';

import Calendar from '../Components/Calendar';
import Header from '../Components/Header';
import InputModal from '../Components/InputModal';
import MultiSelectModal from '../Components/MultiSelectModal';
import RecordHandler from '../Components/RecordHandler';
import RecordItem from '../Components/RecordItem';
import SeparatorLine from '../Components/SeparatorLine';
import Tag from '../Components/Tag';

import { theme } from '../data/colors';
import { ScreenStyles, screenWidth } from './styles';

import { tags } from '../data/tags';
import { addTodo, deleteTodo } from '../redux/action';
import { store } from '../redux/store';
import { TagType, TodoMap, TodoType } from '../types';

interface NavProps {
	navigation: DrawerNavigationProp<any, any>,
}

interface ReduxProps {
	todos: TodoMap,
}

class Screen extends React.Component<NavProps & ReduxProps> {

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
		store.dispatch(deleteTodo(todo.key));
		this.setState({ undoStack: [todo, ...this.state.undoStack] });
	}

	toggleCalendarSelect = (date: string) => {
		if (this.state.date === date)
			this.setState({ date: '' });
		else
			this.setState({ date });
	}

	undo = () => {
		if (this.state.undoStack.length !== 0) {
			store.dispatch(addTodo(this.state.undoStack[0]));
			this.setState({ undoStack: this.state.undoStack.slice(1) });
		}
	}

	render() {
		let todos: Array<TodoType> = Object.keys(this.props.todos).map(key => this.props.todos[key]);

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
	todos: state.todos,
});

export default connect(mapStateToProps)(Screen);
