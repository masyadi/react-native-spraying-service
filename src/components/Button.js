import React from "react";
import { ActivityIndicator, Pressable, StyleSheet, View } from "react-native";
import Text from "./Text";
import { COLORS, FONT_SIZE } from "../constans";
import Row from "./Row";

/**
 *
 * @param {Object} param
 * @param {string} param.title
 * @param {boolean} param.loading
 * @param {boolean} param.disabled
 * @param {function} param.onPress
 * @param {import('react-native').StyleProp<import('react-native').ViewStyle>} param.style
 * @returns
 */
const Button = ({
  title,
  loading = false,
  disabled = false,
  onPress,
  style,
}) => {
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled || loading}
      android_ripple={{ color: "rgba(255,255,255,0.3)" }}
      style={({ pressed }) => [
        styles.button,
        disabled && { backgroundColor: "#6c757d" },
        pressed && { opacity: 0.85 },
        style,
      ]}
    >
      <Row>
        {loading && (
          <ActivityIndicator
            size="small"
            color={COLORS.white}
            style={{ marginRight: 8 }}
          />
        )}
        {title != null && <Text style={styles.text}>{title}</Text>}
      </Row>
    </Pressable>
  );
};

export default Button;

const styles = StyleSheet.create({
  button: {
    minHeight: 50,
    backgroundColor: COLORS.primary,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: FONT_SIZE.font16,
    color: COLORS.white,
    fontWeight: "bold",
  },
});
