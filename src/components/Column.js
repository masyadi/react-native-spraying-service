import React from 'react';
import { View } from 'react-native';
import DirectionContext from './DirectionContext';

/**
 *
 * @param {Object} param
 * @param {React.ReactNode} param.children
 * @param {import('react-native').StyleProp<import('react-native').ViewStyle>} param.style
 * @returns
 */
const Column = ({ children, style }) => (
  <DirectionContext.Provider value="column">
    <View style={[{ flexDirection: 'column' }, style]}>{children}</View>
  </DirectionContext.Provider>
);

export default Column;