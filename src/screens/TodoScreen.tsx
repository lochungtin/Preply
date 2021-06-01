import { DrawerNavigationProp } from '@react-navigation/drawer';
import React from 'react';
import { ScrollView, TouchableOpacity, View } from 'react-native';
import { connect } from 'react-redux';

import Calendar from '../Components/Calendar';
import Header from '../Components/Header';
import RecordHandler from '../Components/RecordHandler';
import RecordInputModal from '../Components/RecordInputModal';
import RecordItem from '../Components/RecordItem';
import SeparatorLine from '../Components/SeparatorLine';

import { ScreenStyles, screenWidth } from './styles';

import { SettingsType, TodoType } from '../types';

interface NavProps {
	navigation: DrawerNavigationProp<any, any>,
}

interface ReduxProps {
	settings: SettingsType,
	todos: Array<TodoType>,
}

class Screen extends React.Component<NavProps & ReduxProps> {

	state = {
		calendarExpand: true,
		inputModalOpen: false,
		filtering: false,
		sorting: false,
	}

	render() {
		return (
			<View style={{ ...ScreenStyles.screenD, backgroundColor: this.props.settings.colorScheme.backgroundC }}>
				<Header nav={this.props.navigation} title={'To Dos'} />
				<RecordHandler
					isCalendarOpen={this.state.calendarExpand}
					isFiltering={this.state.filtering}
					isSorting={this.state.sorting}
					onAdd={() => this.setState({ inputModalOpen: true })}
					toggleCalendar={() => this.setState({ calendarExpand: !this.state.calendarExpand })}
					toggleFilter={() => this.setState({ filtering: !this.state.filtering })}
					toggleSort={() => this.setState({ sorting: !this.state.sorting })}
					type='Todo'
				/>
				<Calendar expand={this.state.calendarExpand} toggleExpand={() => this.setState({ calendarExpand: !this.state.calendarExpand })} />
				<SeparatorLine width={screenWidth * 0.95}/>
				<ScrollView>
					<RecordItem />
					<RecordItem />
					<RecordItem />
					<RecordItem />
					<RecordItem />
				</ScrollView>
				<RecordInputModal
					onClose={() => this.setState({ inputModalOpen: false })}
					onSave={() => this.setState({ inputModalOpen: false })}
					open={this.state.inputModalOpen}
				/>
			</View>
		);
	}
}

const mapStateToProps = (state: ReduxProps) => ({
	settings: state.settings,
	todo: state.todos,
});

export default connect(mapStateToProps)(Screen);
