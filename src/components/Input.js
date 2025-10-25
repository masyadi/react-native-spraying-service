import React from "react";
import { StyleSheet, TextInput, TouchableOpacity, View } from "react-native";
import { COLORS, FONT_SIZE } from "../constans";
import Text from "./Text";
import Row from "./Row";

/**
 *
 * @param {React.ComponentProps<typeof TextInput> & { label?: string; errorMessage?: string, help?: string, left?: React.JSX.Element, right?: React.JSX.Element, style?: import('react-native').StyleProp<import('react-native').TextStyle>, onPress?: function}} props
 * @returns
 */
const Input = ({
  label,
  errorMessage,
  help,
  left,
  right,
  style,
  onPress,
  ...props
}) => {
  const [isFocused, setIsFocused] = React.useState(false);

  return (
    <View style={styles.container}>
      {label != null && <Text style={styles.label}>{label}</Text>}
      <TouchableOpacity activeOpacity={0.5} onPress={onPress}>
        <View pointerEvents={onPress != null ? "none" : "auto"}>
          <Row alignCenter>
            {left != null && <View style={styles.iconLeft}>{left}</View>}
            <TextInput
              {...props}
              style={[
                styles.input,
                left && { paddingLeft: 35 },
                right && { paddingRight: 35 },
                isFocused && styles.inputFocused,
                style,
              ]}
              onFocus={(e) => {
                setIsFocused(true);
              }}
              onBlur={(e) => {
                setIsFocused(false);
              }}
            />
            {right != null && <View style={styles.iconRight}>{right}</View>}
          </Row>
        </View>
      </TouchableOpacity>
      {help != null && <Text style={styles.help}>{help}</Text>}
      {errorMessage != null && <Text style={styles.error}>{errorMessage}</Text>}
    </View>
  );
};

export default Input;

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  label: {
    marginBottom: 10,
  },
  input: {
    flex: 1,
    height: 50,
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: COLORS.textGrey,
    borderRadius: 5,
    fontSize: FONT_SIZE.font16,
    backgroundColor: COLORS.white,
    color: COLORS.textPrimary,
    fontWeight: "400",
  },
  inputFocused: {
    borderColor: "#80bdff",
    borderWidth: 1.5,
  },
  help: {
    fontSize: FONT_SIZE.font12,
    fontStyle: "italic",
    color: COLORS.textGrey,
  },
  error: {
    color: COLORS.red,
    fontSize: FONT_SIZE.font12,
  },
  iconLeft: {
    position: "absolute",
    left: 10,
    zIndex: 1,
  },
  iconRight: {
    position: "absolute",
    right: 10,
    zIndex: 1,
  },
});
