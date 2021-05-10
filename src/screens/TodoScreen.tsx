import React from 'react';
import { View, } from 'react-native';
import { connect } from 'react-redux';

import { TodoType } from '../types';

interface ReduxProps {
    todos: Array<TodoType>,
}

class AppNav extends React.Component<ReduxProps> {
	render() {
		return (
			<View>

			</View>
		);
	}
}

const mapStateToProps = (state: ReduxProps) => ({
    todos: state.todos,
});

export default connect(mapStateToProps)(AppNav);
