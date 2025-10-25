import React from 'react';
import { View } from 'react-native';
import DirectionContext from './DirectionContext';

/**
 *
 * @param {Object} param
 * @param {Number} param.size
 * @returns
 */
const Space = ({ size = 10 }) => {
  const direction = React.useContext(DirectionContext);

  return <View style={direction === 'row' ? { width: size } : { height: size }} />;
};

export default Space;
