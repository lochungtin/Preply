import React from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';

import ClockBtn from './ClockBtn';

import { ClockStyles } from './styles';

import { ClockConfigType, SettingsType, } from '../../types';
import { keygen } from '../../utils/keygen';

interface ReduxProps {
    settings: SettingsType,
}

interface ClockProps {
    children?: any,
    data: Array<string>,
    offset: number,
    onPress: (rt: string) => void,
    size: number,
}

class Clock extends React.Component<ReduxProps & ClockProps> {

    render() {
        const r = this.props.size / 2;
        const d = Math.sqrt(3) / 2 * r;

        let grid: Array<ClockConfigType> = [
            { height: 0, values: [this.props.data[0]], width: 0, },
            { height: r - d, values: [this.props.data[11], this.props.data[1]], width: r, },
            { height: d - r / 2, values: [this.props.data[10], this.props.data[2]], width: d * 2, },
            { height: r / 2, values: [this.props.data[9], this.props.data[3]], width: r * 2, },
            { height: r / 2, values: [this.props.data[8], this.props.data[4]], width: d * 2, },
            { height: d - r / 2, values: [this.props.data[7], this.props.data[5]], width: r, },
            { height: r - d, values: [this.props.data[6]], width: 0, },
        ];

        return (
            <View style={{ ...ClockStyles.rootContainer, height: this.props.size, width: this.props.size, }}>
                {grid.map((data, index) => {
                    return (
                        <View key={keygen()}>
                            <View style={{ height: data.height }} />
                            <View style={{ ...ClockStyles.positionRow, height: 0, width: data.width + this.props.offset, }} >
                                <ClockBtn
                                    onPress={() => this.props.onPress(data.values[0])}
                                    size={30}
                                    text={data.values[0]}
                                    selected={true}
                                />
                                {index === 3 && this.props.children}
                                {data.values.length === 2 &&
                                    <ClockBtn
                                        onPress={() => this.props.onPress(data.values[1])}
                                        size={30}
                                        text={data.values[1]}
                                        selected={true}
                                    />
                                }
                            </View>
                        </View>
                    );
                })}
            </View>
        );
    }
}

const mapStateToProps = (state: ReduxProps) => ({
    settings: state.settings
});

export default connect(mapStateToProps)(Clock);
