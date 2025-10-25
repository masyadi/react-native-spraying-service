import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { COLORS, FONT_SIZE } from "../constans";
import Text from "./Text";

/**
 *
 * @param {Object} param
 * @param {String} param.label
 * @param {Boolean} param.active
 * @param {function} param.onPress
 * @param {JSX.Element} param.children
 * @returns
 */
const RadioSectionItem = ({ label, active, onPress, children }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={[styles.container, active && styles.containerActive]}>
        <View style={styles.containerDot}>
          <View style={[styles.dot, active && styles.dotActive]}></View>
        </View>
        <View style={{ flex: 1 }}>
          {label && <Text style={styles.radioText}>{label}</Text>}
          {children}
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default RadioSectionItem;

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderRadius: 7,
    paddingHorizontal: 16,
    paddingVertical: 17,
    borderColor: COLORS.divider,
    flexDirection: "row",
    // alignItems: 'center',
    marginBottom: 10,
  },
  radioText: {
    fontSize: FONT_SIZE.font16,
  },
  containerActive: {
    borderColor: COLORS.green,
    backgroundColor: "#f6fbf3",
  },
  containerDot: {
    width: 22,
    height: 22,
    borderRadius: 22 / 2,
    borderWidth: 1,
    borderColor: COLORS.divider,
    marginRight: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  dot: {
    width: 15,
    height: 15,
    borderRadius: 15 / 2,
    backgroundColor: COLORS.transparent,
  },
  dotActive: {
    borderRadius: 15 / 2,
    backgroundColor: COLORS.green,
  },
});
