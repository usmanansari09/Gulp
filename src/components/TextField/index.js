import React from 'react';
import { TextInput } from 'react-native';
import { Text, View } from 'native-base';
import styles from './styles';

const TextField = ({
  onChange,
  label,
  autoCapitalize = 'none',
  secureTextEntry = false,
  value,
  leftIcon,
  containerStyle,
  onPress,
  placeholder,
  placeholderTextColor,
  rightIcon,
  keyboardType = 'default',
  style = {},
  labelStyle = {}
}) => {
  return (
    <View style={containerStyle ?? styles.inputFiledContaienr}>
      <View style={styles.formGroup}>
        <View style={styles.iconsLeft}>{leftIcon}</View>
        {label && (
          <Text style={{ ...styles.defaultLabel, ...labelStyle }}>{label}</Text>
        )}
        <TextInput
          style={{ ...styles.inputFiled, ...style }}
          autoCapitalize={autoCapitalize}
          secureTextEntry={secureTextEntry}
          name={label}
          placeholderTextColor={placeholderTextColor}
          placeholder={placeholder}
          value={value}
          onPressIn={onPress}
          keyboardType={keyboardType}
          onChangeText={onChange}
        />
        <View style={styles.iconsRight}>{rightIcon}</View>
      </View>
    </View>
  );
};
export default TextField;
