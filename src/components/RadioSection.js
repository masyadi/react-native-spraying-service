import React from "react";
import { StyleSheet, View } from "react-native";
import Text from "./Text";
import RadioSectionItem from "./RadioSectionItem";
import { COLORS, FONT_SIZE } from "../constans";

/**
 *
 * @param {Object} param
 * @param {String} param.label
 * @param {Array<{title: String, value: String}>} param.data
 * @param {String} param.errorMessage
 * @param {String|object} param.value
 * @param {function({title: String, value: String}): void} param.onChange
 * @param {JSX.Element} param.children
 * @returns
 */
const RadioSection = ({
  label,
  data = [],
  value,
  errorMessage,
  onChange,
  children,
}) => {
  const OTHER = { title: "Other", value: "other" };
  const [checked, setChecked] = React.useState();

  const _handlePress = (item) => {
    setChecked(item);
    onChange && onChange(item);
  };

  React.useEffect(() => {
    if (data.length) {
      _handlePress(data[0]);
    }
  }, []);

  React.useEffect(() => {
    if (data.length && value) {
      const _defaultValue = typeof value == "object" ? value?.value : value;
      const item = data.find((item) => item.value == _defaultValue);

      if (item) {
        setChecked(item);
      }
    }
  }, [value]);

  return (
    <View style={styles.container}>
      {label && <Text style={styles.label}>{label}</Text>}
      {data.map((item, index) => (
        <RadioSectionItem
          active={checked?.value == item.value}
          label={item.title}
          onPress={() => _handlePress(item)}
          key={index}
        />
      ))}
      {children && (
        <RadioSectionItem
          active={checked?.value == OTHER.value}
          onPress={() => _handlePress(OTHER)}
          key={OTHER.value}
        >
          {children}
        </RadioSectionItem>
      )}
      {errorMessage != null && <Text style={styles.error}>{errorMessage}</Text>}
    </View>
  );
};

export default RadioSection;

const styles = StyleSheet.create({
  container: {
    marginBottom: 15,
  },
  label: {
    marginBottom: 10,
  },
  error: {
    color: COLORS.red,
    fontSize: FONT_SIZE.font12,
  },
});
