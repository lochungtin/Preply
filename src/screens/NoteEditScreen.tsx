import { DrawerNavigationProp } from '@react-navigation/drawer';
import moment from 'moment';
import React from 'react';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { connect } from 'react-redux';

import MultiSelectModal from '../Components/MultiSelectModal';
import SeparatorLine from '../Components/SeparatorLine';
import Tag from '../Components/Tag';

import { theme } from '../data/colors';
import { NoteScreenStyles, ScreenStyles, screenWidth } from './styles';

import { tags } from '../data/tags';
import { editNote } from '../redux/action';
import { store } from '../redux/store';
import { NoteType, TagType } from '../types';


interface NavProps {
	navigation: DrawerNavigationProp<any, any>,
	route: { params: NoteType },
}

interface ReduxProps {
	notes: Array<NoteType>,
}

class Screen extends React.Component<NavProps & ReduxProps> {

	state = {
		content: this.props.route.params.content,
		edited: false,
		openTagPicker: false,
		tagKey: this.props.route.params.tagKey,
		title: this.props.route.params.title,
	}

	save = () => {
		store.dispatch(editNote({
			content: this.state.content,
			date: {
				creation: this.props.route.params.date.creation,
				modified: moment().format('DD-MM-YYYY'),
			},
			key: this.props.route.params.key,
			tagKey: this.state.tagKey,
			title: this.state.title,
		}));
		this.setState({ edited: false });
	}

	render() {
		return (
			<View style={{ ...ScreenStyles.screenD, backgroundColor: theme.backgroundC }}>
				<View style={NoteScreenStyles.titleRow}>
					<TouchableOpacity onPress={this.props.navigation.goBack}>
						<Icon
							color={theme.textC}
							name='chevron-left'
							size={45}
						/>
					</TouchableOpacity>
					<TextInput
						onChangeText={title => this.setState({ title, edited: true })}
						placeholderTextColor={theme.dTextC}
						style={{...NoteScreenStyles.titleInput, color: theme.textC}}
						value={this.state.title}
					/>
					<TouchableOpacity onPress={this.save}>
						<Icon
							color={this.state.edited ? theme.accent : theme.textC}
							name='content-save-outline'
							size={30}
						/>
					</TouchableOpacity>
				</View>
				<View style={NoteScreenStyles.infoRow}>
					<MultiSelectModal
						items={tags.map((tag: TagType) => {
							return (
								<Tag {...tag} width={150} />
							);
						})}
						onClose={() => this.setState({ openTagPicker: false })}
						onItemPress={tagKey => this.setState({ edited: true, openTagPicker: false, tagKey: 'tag:' + tagKey })}
						open={this.state.openTagPicker}
						selected={parseInt(this.state.tagKey.substring(4))}
					>
						<TouchableOpacity onPress={() => this.setState({ openTagPicker: true })}>
							<Tag {...(tags.find(tag => tag.key === this.state.tagKey) || tags[0])} />
						</TouchableOpacity>
					</MultiSelectModal>
					<Text style={{ ...NoteScreenStyles.dateText, color: theme.dTextC }}>
						{`Last Modified: ${this.props.route.params.date.modified}`}
					</Text>
				</View>
				<SeparatorLine width={screenWidth * 0.95} />
				<TextInput
					multiline
					onChangeText={content => this.setState({ content, edited: true })}
					placeholder='start typing ...'
					placeholderTextColor={theme.dTextC}
					style={{ ...NoteScreenStyles.textInput, color: theme.textC }}
					value={this.state.content}
				/>
			</View>
		);
	}
}

const mapStateToProps = (state: ReduxProps) => ({
	notes: state.notes,
});

export default connect(mapStateToProps)(Screen);
