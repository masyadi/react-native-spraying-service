import React from "react";
import { View } from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import moment from "moment";
import Input from "./Input";

/**
 *
 * @param {Object} param
 * @param {String} param.mode date | datetime | time
 * @param {Date} param.minimumDate
 * @param {Date} param.maximumDate
 * @param {Function} param.onConfirm
 * @param {String} param.label
 * @param {String} param.placeholder
 * @param {String} param.errorMessage
 * @param {String} param.value
 * @param {React.JSX.Element} param.left
 * @param {String} param.format
 * @returns
 */
const InputDateTimePicker = ({
  mode = "datetime",
  minimumDate,
  maximumDate,
  onConfirm,
  label,
  placeholder,
  errorMessage,
  value,
  left,
  format = "YYYY-MM-DD HH:mm:ss",
}) => {
  const [visiblelity, setVisiblelity] = React.useState(false);

  const open = () => {
    setVisiblelity(true);
  };

  const confirm = (date) => {
    setVisiblelity(false);
    onConfirm && onConfirm(date);
  };

  const cancel = () => {
    setVisiblelity(false);
  };

  const dateFormated = (date, format) => {
    if (!date) return null;
    // if (mode.toLocaleLowerCase() == 'time') {
    //   return moment(date, 'HH:mm:ss').format(format);
    // }
    return moment(date).format(format);
  };

  return (
    <View>
      <Input
        label={label}
        placeholder={placeholder}
        errorMessage={errorMessage}
        value={dateFormated(value, format)}
        left={left}
        onPress={open}
      />
      <DateTimePickerModal
        isVisible={visiblelity}
        mode={mode}
        date={value ? moment(value).toDate() : new Date()}
        onConfirm={confirm}
        onCancel={cancel}
        minimumDate={minimumDate}
        maximumDate={maximumDate}
      />
    </View>
  );
};

export default InputDateTimePicker;
