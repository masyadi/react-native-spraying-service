import React from "react";
import { View, StyleSheet, Image } from "react-native";
import Text from "./Text";
import Button from "./Button";
import { COLORS, FONT_SIZE } from "../constans";

/**
 *
 * @param {Object} param
 * @param {string} param.title
 * @param {string} param.subtitle
 * @param {number|object} param.icon
 * @param {string} param.buttonText
 * @param {function} param.onPress
 * @param {function} param.onRefresh
 * @param {import('react-native').StyleProp<import('react-native').ViewStyle>} param.style
 */
const EmptyData = ({
  title = "Tidak ada data yang tersedia.",
  subtitle,
  icon,
  buttonText,
  onPress,
  onRefresh,
  style,
}) => {
  return (
    <View style={[styles.container, style]}>
      {icon &&
        (typeof icon === "number" ? (
          <Image source={icon} style={styles.icon} resizeMode="contain" />
        ) : (
          <Image
            source={{ uri: icon }}
            style={styles.icon}
            resizeMode="contain"
          />
        ))}
      <Text style={subtitle ? styles.title : styles.subtitle}>{title}</Text>
      {subtitle != null && <Text style={styles.subtitle}>{subtitle}</Text>}

      {buttonText && onPress && <Button title={buttonText} onPress={onPress} size="small" />}

      {onRefresh != null && <Button title="Refresh" onPress={onRefresh} size="small"  />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  icon: {
    width: 120,
    height: 120,
    marginBottom: 16,
  },
  title: {
    fontSize: FONT_SIZE.font18,
    fontWeight: "bold",
    marginBottom: 8,
    color: COLORS.textPrimary,
  },
  subtitle: {
    textAlign: "center",
    marginBottom: 16,
  },
});

export default EmptyData;
