import React from "react";
import { StyleSheet, Text as RNText } from "react-native";
import { COLORS, FONT_SIZE, FONT_TYPE } from "../constans/Theme";

/**
 *
 * @param {React.ComponentProps<typeof RNText> & { bold?: boolean; size?: number }} props
 * @returns
 */
const Text = ({ bold, size, children, ...props }) => {
  return (
    <RNText
      {...props}
      style={[
        styles.text,
        bold && styles.textBold,
        size && { fontSize: size },
        props.style,
      ]}
    >
      {children}
    </RNText>
  );
};

export default Text;

const styles = StyleSheet.create({
  text: {
    fontSize: FONT_SIZE.font14,
    fontFamily: FONT_TYPE.robotoRegular,
    color: COLORS.textPrimary,
  },
  textBold: {
    fontWeight: "bold",
  },
});
