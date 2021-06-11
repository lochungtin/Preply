import { DrawerNavigationProp } from '@react-navigation/drawer';
import moment from 'moment';
import React from 'react';
import { ScrollView, View } from 'react-native';
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

import { deleteTodo } from '../redux/action';
import { store } from '../redux/store';
import { TodoType } from '../types';
import { tags } from '../data/tags';

interface NavProps {
	navigation: DrawerNavigationProp<any, any>,
}

interface ReduxProps {
	todos: Array<TodoType>,
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
	}

	toggleCalendarSelect = (date: string) => {
		if (this.state.date === date)
			this.setState({ date: '' });
		else
			this.setState({ date });
	}

	render() {

		let todos: Array<TodoType> = [...this.props.todos];

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
					isCalendarOpen={this.state.calendarExpand}
					isFiltering={this.state.filter !== tags.length}
					isSorting={this.state.sorting}
					onAdd={() => this.setState({ inputModalOpen: true })}
					toggleCalendar={() => this.setState({ calendarExpand: !this.state.calendarExpand })}
					toggleFilter={() => this.setState({ openFilterPicker: true })}
					toggleSort={() => this.setState({ sorting: !this.state.sorting })}
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
						{todos.map(todo => {
							return (
								<RecordItem
									key={todo.key}
									onIconPress={recordKey => store.dispatch(deleteTodo(recordKey))}
									onPress={recordKey => this.setState({ todo, inputModalOpen: true })}
									record={todo}
								/>
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
						...tags.map(tag => <Tag {...tag} width={150} />),
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
