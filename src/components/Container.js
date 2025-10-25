import React from 'react';
import { View, StyleSheet } from 'react-native';

/**
 * 
 * @param {import('react-native').ViewProps} props
 * @returns 
 */
const Container = ({ children, style, ...props }) => {
  return (
    <View style={{ ...styles.container, ...style }} {...props}>
      {children}
    </View>
  );
};

export default Container;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
  },
});
