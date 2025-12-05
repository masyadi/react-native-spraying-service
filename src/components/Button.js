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
 * @param {"small"|"medium"|"large"} param.size
 * @param {"solid"|"outline"} param.type
 * @param {string} param.color
 * @param {function} param.onPress
 * @param {import('react-native').StyleProp<import('react-native').ViewStyle>} param.style
 * @returns
 */
const Button = ({
  title,
  loading = false,
  disabled = false,
  size = "medium",
  type = "solid",
  color = COLORS.primary,
  onPress,
  style,
}) => {
  const isOutline = type === "outline";
  const backgroundColor = isOutline ? "transparent" : color;
  const borderColor = color;
  const textColor = isOutline ? color : COLORS.white;
  const textSizeStyle = styles[`text_${size}`];

  return (
    <Pressable
      onPress={onPress}
      disabled={disabled || loading}
      android_ripple={{
        color: isOutline ? "rgba(0,0,0,0.05)" : "rgba(255,255,255,0.3)",
      }}
      style={({ pressed }) => [
        styles.button,
        styles?.[size],
        pressed && { opacity: 0.85 },
        {
          backgroundColor: disabled ? "#6c757d" : backgroundColor,
          borderColor: disabled ? "#6c757d" : borderColor,
          borderWidth: isOutline ? 1 : 0,
        },
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
        {title != null && (
          <Text style={[styles.text, textSizeStyle, { color: textColor }]}>{title}</Text>
        )}
      </Row>
    </Pressable>
  );
};

export default Button;

const styles = StyleSheet.create({
  button: {
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontWeight: "bold",
  },
  text_small: {
    fontSize: FONT_SIZE.font14,
  },
  text_medium: {
    fontSize: FONT_SIZE.font16,
  },
  text_large: {
    fontSize: FONT_SIZE.font18,
  },
  small: {
    minHeight: 36,
    paddingVertical: 6,
    paddingHorizontal: 12,
  },
  medium: {
    minHeight: 48,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  large: {
    minHeight: 60,
    paddingVertical: 14,
    paddingHorizontal: 28,
  },
});
