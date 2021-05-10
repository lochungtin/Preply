
import React from 'react';
import { StatusBar, Text, View, } from 'react-native';
import { connect } from 'react-redux';
import { TodoType } from '../types';

interface ReduxProps {
    todo: Array<TodoType>,
}

class AppNav extends React.Component<ReduxProps> {
	render() {
		return (
			<View>
				<StatusBar
					backgroundColor="#0e0e0e"
				/>
				<Text>
					{this.props.todo.length}
				</Text>
			</View>
		);
	}
}

const mapStateToProps = (state: any) => ({
    todo: state.todo,
});

export default connect(mapStateToProps)(AppNav);
