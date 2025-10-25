import React from "react";
import { TextInput } from "react-native";
import Input from "./Input";

/**
 *
 * @param {React.ComponentProps<typeof TextInput> & {label: string, value: string, onChangeText: (value: string) => void, minHeight: number, maxHeight: number, errorMessage: string }} props
 * @returns
 */
const Textarea = ({
  label,
  value,
  onChangeText,
  minHeight = 80,
  maxHeight = 200,
  errorMessage,
  ...props
}) => {
  const [inputHeight, setInputHeight] = React.useState(minHeight);

  return (
    <Input
      {...props}
      label={label}
      value={value}
      onChangeText={onChangeText}
      errorMessage={errorMessage}
      multiline
      textAlignVertical="top"
      style={{ minHeight: minHeight, height: inputHeight }}
      onContentSizeChange={(e) => {
        const newHeight = e.nativeEvent.contentSize.height;
        if (newHeight < maxHeight) setInputHeight(newHeight);
        else setInputHeight(maxHeight);
      }}
    />
  );
};

export default Textarea;
