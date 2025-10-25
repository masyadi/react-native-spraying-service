import React from 'react';
import { ActivityIndicator, Modal, StyleSheet, View } from 'react-native';
import { COLORS } from '../constans';
import Text from './Text';

/**
 *
 * @param {Object} param
 * @param {boolean} param.visible
 * @param {String} param.title
 * @returns
 */
const LoadingScreen = ({ visible, title }) => {
  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.container}>
        <View style={styles.box}>
          <ActivityIndicator size="large" color={COLORS.primary} />
          {title != null && <Text style={styles.title}>{title}</Text>}
        </View>
      </View>
    </Modal>
  );
};

export default LoadingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)', // semi-transparent
    justifyContent: 'center',
    alignItems: 'center',
  },
  box: {
    backgroundColor: '#fff',
    padding: 24,
    borderRadius: 12,
    alignItems: 'center',
    minWidth: 150,
  },
  title: {
    marginTop: 12,
    fontSize: 16,
    color: '#333',
  },
});
