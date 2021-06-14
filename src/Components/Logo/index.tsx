import React from 'react';
import { Image } from 'react-native';
import { base64 } from './logo';

interface LogoProps {
    size: number,
}

export default class Header extends React.Component<LogoProps> {
    render = () => <Image source={{ uri: `data:image/png;base64,${base64}` }} style={{ height: this.props.size, width: this.props.size }} />;
}
