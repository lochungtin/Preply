import { DrawerNavigationProp } from '@react-navigation/drawer';
import React from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';

import Header from '../Components/Header';

import { theme } from '../data/colors';
import { signIn } from '../firebase/auth';
import { ScreenStyles } from './styles';

interface NavProps {
	navigation: DrawerNavigationProp<any, any>,
}

interface ReduxProps {
	
}

class Screen extends React.Component<NavProps & ReduxProps> {
	render() {

		signIn('lochungtin@gmail.com', 'killme').then(res => console.log(res.user?.email, res.user?.uid)).catch(err => console.log(err));

		return (
			<View style={{...ScreenStyles.screenD, backgroundColor: theme.backgroundC}}>
				<Header nav={this.props.navigation} title={"Sign In"} />
			</View>
		);
	}
}

const mapStateToProps = (state: ReduxProps) => ({
    
});

export default connect(mapStateToProps)(Screen);
