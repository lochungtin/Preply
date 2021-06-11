import { DrawerNavigationProp } from '@react-navigation/drawer';
import React from 'react';
import { ScrollView, View } from 'react-native';
import { connect } from 'react-redux';

import Calendar from '../Components/Calendar';
import Header from '../Components/Header';
import InputModal from '../Components/InputModal';
import RecordHandler from '../Components/RecordHandler';
import SeparatorLine from '../Components/SeparatorLine';
import RecordItem from '../Components/RecordItem';

import { theme } from '../data/colors';
import { ScreenStyles, screenWidth } from './styles';

import { deleteTodo } from '../redux/action';
import { store } from '../redux/store';
import { TodoType } from '../types';

interface NavProps {
	navigation: DrawerNavigationProp<any, any>,
}

interface ReduxProps {
	todos: Array<TodoType>,
}

class Screen extends React.Component<NavProps & ReduxProps> {

	state = {
		calendarExpand: false,
		inputModalOpen: false,
		filtering: false,
		record: undefined,
		sorting: false,
	}

	render() {

		let todos: Array<TodoType> = [...this.props.todos];

		if (this.state.sorting)
			todos.sort((a, b) => parseInt(a.tagKey.substring(4)) - parseInt(b.tagKey.substring(4)))

		return (
			<View style={{ ...ScreenStyles.screenD, backgroundColor: theme.backgroundC }}>
				<Header nav={this.props.navigation} title={'To Dos'} />
				<RecordHandler
					calendar
					isCalendarOpen={this.state.calendarExpand}
					isFiltering={this.state.filtering}
					isSorting={this.state.sorting}
					onAdd={() => this.setState({ inputModalOpen: true })}
					toggleCalendar={() => this.setState({ calendarExpand: !this.state.calendarExpand })}
					toggleFilter={() => this.setState({ filtering: !this.state.filtering })}
					toggleSort={() => this.setState({ sorting: !this.state.sorting })}
				/>
				<Calendar
					expand={this.state.calendarExpand}
					onDatePress={date => console.log(date)}
					toggleExpand={() => this.setState({ calendarExpand: !this.state.calendarExpand })}
					selected={''}
				/>
				<SeparatorLine width={screenWidth * 0.95} />
				<ScrollView>
					{todos.map(todo => {
						return (
							<RecordItem
								key={todo.key}
								onIconPress={recordKey => store.dispatch(deleteTodo(recordKey))}
								onPress={recordKey => this.setState({ inputModalOpen: true, record: todo })}
								record={todo}
							/>
						);
					})}
				</ScrollView>
				<InputModal
					onClose={() => this.setState({ inputModalOpen: false, record: undefined })}
					open={this.state.inputModalOpen}
					record={this.state.record}
				/>
			</View>
		);
	}
}

const mapStateToProps = (state: ReduxProps) => ({
	todos: state.todos,
});

export default connect(mapStateToProps)(Screen);
