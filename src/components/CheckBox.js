import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Text from "./Text";
import { COLORS, FONT_SIZE } from "../constans";

/**
 *
 * @param {Object} param
 * @param {string} param.label
 * @param {boolean} param.checked
 * @param {(value: string) => void} param.onPress
 * @returns
 */
const CheckBox = ({ label, checked = false, onPress }) => {
  // const [checked, setChecked] = React.useState(value || false);

  // const toggleCheckbox = () => {
  //   setChecked(!checked);
  //   if (onValueChange) onValueChange(!checked);
  // };

  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={[styles.checkbox, checked && styles.checked]}>
        {checked && <MaterialIcons name="check" size={18} color="white" />}
      </View>
      {label != null && <Text style={styles.label}>{label}</Text>}
    </TouchableOpacity>
  );
};

export default CheckBox;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 5,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderWidth: 2,
    borderColor: "#6c757d",
    borderRadius: 4,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
  },
  checked: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  label: {
    marginLeft: 10,
    fontSize: FONT_SIZE.font16,
  },
});
