import React from 'react';
import { View, } from 'react-native';
import { connect } from 'react-redux';

import { TodoType } from '../types';

interface ReduxProps {
    notes: Array<TodoType>,
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
    notes: state.notes,
});

export default connect(mapStateToProps)(AppNav);
