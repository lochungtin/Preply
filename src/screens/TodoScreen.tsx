import { DrawerNavigationProp } from '@react-navigation/drawer';
import React from 'react';
import { ScrollView, View, } from 'react-native';
import { connect } from 'react-redux';

import Calendar from '../Components/Calendar';
import Header from '../Components/Header';
import InputModal from '../Components/InputModal';
import RecordHandler from '../Components/RecordHandler';
import SeparatorLine from '../Components/SeparatorLine';
import TodoItem from '../Components/TodoItem';

import { theme } from '../data/colors';
import { ScreenStyles, screenWidth, } from './styles';

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
		sorting: false,
	}

	render() {
		return (
			<View style={{ ...ScreenStyles.screenD, backgroundColor: theme.backgroundC }}>
				<Header nav={this.props.navigation} title={'To Dos'} />
				<RecordHandler
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
					{this.props.todos.map(todo => {
						return (
							<TodoItem {...todo} onPress={recordKey => console.log(recordKey)}/>
						);
					})}
				</ScrollView>
				<InputModal
					onClose={() => this.setState({ inputModalOpen: false })}
					open={this.state.inputModalOpen}
				/>
			</View>
		);
	}
}

const mapStateToProps = (state: ReduxProps) => ({
	todos: state.todos,
});

export default connect(mapStateToProps)(Screen);
