import React from 'react';
import { Text as RNText, TextProps } from 'react-native';

export default function ComicText(props: TextProps) {
    return (
        <RNText
            {...props}
            style={[{ fontFamily: 'ComicHero' }, props.style]}
        />
    );
}
