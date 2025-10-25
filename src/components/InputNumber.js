import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import Input from './Input';

/**
 *
 * @param {Object} param
 * @param {String} param.value
 * @param {function(String)} param.onChangeText
 * @param {function(Number)} param.onChangeValue
 * @param {String} param.prefix
 * @param {import('react-native-elements').InputProps} props
 * @returns
 */
const InputNumber = ({
  value = '',
  onChangeText,
  onChangeValue,
  prefix,
  ...props
}) => {
  const [displayValue, setDisplayValue] = useState(formatNumber(value));

  /**
   * Format angka menjadi string dengan titik ribuan
   * contoh: 15000 -> "15.000"
   */
  function formatNumber(number) {
    if (number === null || number === undefined || number === '') return '';
    const str = String(number).replace(/[^\d,]/g, ''); // hapus semua kecuali angka dan koma
    const [integer, decimal] = str.split(',');
    return (
      integer.replace(/\B(?=(\d{3})+(?!\d))/g, '.') +
      (decimal ? ',' + decimal : '')
    );
  }

  /**
   * Handler setiap kali user mengetik
   */
  const handleChange = text => {
    // Hapus semua karakter selain angka dan koma
    const cleanText = text.replace(/[^\d,]/g, '');
    const formatted = formatNumber(cleanText);
    setDisplayValue(formatted);

    // Ambil angka mentahan untuk dikirim ke parent
    const numeric = Number(cleanText.replace(/\./g, '').replace(',', '.'));
    if (onChangeValue) onChangeValue(numeric);

    // Kirim teks format ke onChangeText (jika ada)
    if (onChangeText) onChangeText(formatted);
  };

  const renderLeftIcon = () => {
    if (!prefix) return null;

    return <Text style={styles.prefix}>{prefix}</Text>;
  };

  return (
    <Input
      {...props}
      value={displayValue}
      onChangeText={handleChange}
      keyboardType="numeric"
      placeholder="Masukkan harga"
      leftIcon={renderLeftIcon}
      leftIconContainerStyle={{ height: 'auto' }}
    // inputContainerStyle={{
    //   borderWidth: 1,
    //   borderColor: '#ccc',
    //   borderRadius: 8,
    //   paddingHorizontal: 8,
    // }}
    // inputStyle={{ fontSize: 16 }}
    // labelStyle={{ fontWeight: 'bold' }}
    // renderErrorMessage={false}
    />
  );
};

export default InputNumber;

const styles = StyleSheet.create({
  prefix: {
    // fontSize: 16,
    // color: '#000',
    // marginRight: 4,
    opacity: 0.5,
    // marginTop: -5,
    paddingLeft: 10,
  },
});
