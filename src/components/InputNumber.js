import React from "react";
import { StyleSheet, TextInput } from "react-native";
import Input from "./Input";
import { numberFormat } from "../helpers";
import Text from "./Text";

/**
 *
 * @param {React.ComponentProps<typeof TextInput> & {value: String, onChangeText: (value: String) => void, onChangeValue: (value: Number) => void, prefix: String}} props
 * @returns
 */
const InputNumber = ({
  value = "",
  onChangeText,
  onChangeValue,
  prefix,
  ...props
}) => {
  const [displayValue, setDisplayValue] = React.useState(numberFormat(value));

  const handleChange = (text) => {
    const formatted = numberFormat(text);
    setDisplayValue(formatted);

    const numeric = Number(text.replace(/\./g, "").replace(",", "."));
    if (onChangeValue) onChangeValue(numeric);

    if (onChangeText) onChangeText(formatted);
  };

  const renderLeftIcon = () => {
    return <Text style={styles.prefix}>{prefix}</Text>;
  };

  return (
    <Input
      {...props}
      value={displayValue}
      onChangeText={handleChange}
      keyboardType="numeric"
      left={prefix ? renderLeftIcon : null}
    />
  );
};

export default InputNumber;

const styles = StyleSheet.create({
  prefix: {
    opacity: 0.5,
    paddingLeft: 10,
  },
});
