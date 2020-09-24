import React, { useState } from 'react';
import { StyleSheet,View,Text } from 'react-native';
import {CheckBox} from 'react-native-elements';


const defaultColor = '#f0245a';

const ToggleGroup = ({item1,item2,state,onPress1,onPress2,header,color}) => {
  
  return <View>
  <Text style={{...styles.titleStyle,color:color}}>{header}</Text>
  <View>
    <CheckBox
      onPress={onPress1}
      title={item1}
      checked={state.one}
      uncheckedColor={color}
      checkedColor={color}
      textStyle={{...styles.checkBoxTitleStyle,color:color}}
      containerStyle={styles.containerStyle}
    />
    <CheckBox
      onPress={onPress2}
      title={item2}
      checked={state.two}
      uncheckedColor={color}
      checkedColor={color}
      textStyle={{...styles.checkBoxTitleStyle,color:color}}
      containerStyle={styles.containerStyle}
    />
  </View>
</View>

}

const styles = StyleSheet.create({
  checkBoxTitleStyle: {
    
  },
  containerStyle: {
    margin: 0
  },
  titleStyle: {
    fontSize: 18,
    margin: 10,
    fontWeight: '600'
  }
});

export default ToggleGroup;