import React from 'react';
import {StyleSheet,Text,View} from 'react-native';
import { Input } from 'react-native-elements';
import Icon from 'react-native-vector-icons/MaterialIcons';

const defaultColor = '#f0245a';

const TextInput = ({label,placeholder,color,errorMessage,containerStyle,value,onChangeText}) => {
  return <View>
    <Input
    label={label}
    leftIcon={<Icon
      style={{paddingRight:10}}
      name='input'
      size={24}
      color={color}
    />}
    placeholder={placeholder}
    inputContainerStyle={{...styles.inputStyle,borderColor:color}}
    labelStyle={{...styles.labelStyle,color:color}}
    renderErrorMessage={false}
    errorMessage={errorMessage}
    errorStyle={{...styles.errorStyle,color:color}}
    containerStyle={containerStyle}
    value={value}
    onChangeText={(val) => onChangeText(val)}
  />
  </View>
  
}

const styles = StyleSheet.create({
  labelStyle:{
    fontSize:16
  },
  inputStyle:{
  },
  errorStyle:{
    fontSize:14,
    fontWeight:'500'
  }
});

export default TextInput;