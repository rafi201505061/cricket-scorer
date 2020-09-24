import React, { useState } from 'react';
import { StyleSheet, KeyboardAvoidingView } from 'react-native';
import Button from './Button';
import FormInput from './FormInput';


const Form = ({ buttonName, buttonColor, label1, label2, onPress,
  placeholder1, placeholder2, inputColor, errorMessage1, errorMessage2 }) => {

  const [state, setState] = useState({ value1: '', value2: '' });

  return <KeyboardAvoidingView style={styles.containerStyle}>
    <FormInput
      label1={label1}
      label2={label2}
      placeholder1={placeholder1}
      placeholder2={placeholder2}
      inputColor={inputColor}
      errorMessage1={errorMessage1}
      errorMessage2={errorMessage2}
      state={state}
      setState={(val) => setState(val)}
    />
    <Button name={buttonName} color={buttonColor} onPress={() => onPress(state.value1, state.value2)} />
  </KeyboardAvoidingView>
}

const styles = StyleSheet.create({
  containerStyle: {
    flex: 1,
    justifyContent: 'center',
    marginBottom: 100
  }
})

export default Form;