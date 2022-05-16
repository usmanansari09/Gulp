import React from 'react';
import { Text } from 'react-native';

import { Typography } from 'Theme';

export const AppText = ({ children, ...props } = props) => (
  <Text
    {...props}
    allowFontScaling={false}
    style={[{ fontSize: Typography.TypeSizes.base }, props.style]}
    numberOfLines={props.numberOfLines}
    ellipsizeMode={props.ellipsizeMode ?? 'tail'}>
    {children}
  </Text>
);
