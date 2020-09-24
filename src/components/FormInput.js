import React from 'react';
import { StyleSheet } from 'react-native';
import TextInput from './TextInput';

const FormInput = ({ label1, label2, placeholder1, placeholder2,
  inputColor, errorMessage1, errorMessage2,state,setState }) => {

  return <>
    <TextInput
      label={label1}
      placeholder={placeholder1}
      errorMessage={errorMessage1}
      color={inputColor}
      containerStyle={styles.inputContainerStyle}
      value={state.value1}
      onChangeText={(newVal) => setState({...state,value1:newVal})}
    />
    <TextInput
      label={label2}
      placeholder={placeholder2}
      errorMessage={errorMessage2}
      color={inputColor}
      containerStyle={styles.inputContainerStyle}
      value={state.value2}
      onChangeText={(newVal) => setState({...state,value2:newVal})}
    />
  </>
}

const styles = StyleSheet.create({
  inputContainerStyle:{
    marginBottom:15
  }
});

export default FormInput;