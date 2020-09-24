import React from 'react';
import {StyleSheet,TouchableOpacity,Text,View} from 'react-native';

const Button = ({name,color,onPress,disabled}) => {
  /*
  name:button name (string)
  color : button border and text color
  onPress: onPress button(callback)
  */
 
 return <TouchableOpacity onPress={onPress} disabled={disabled}>
    <View style={{...styles.containerStyle,borderColor:color,opacity:disabled?.2:1.0}}>
      <Text style={{...styles.textStyle,color:color}}>
        {name}
      </Text>
    </View>
  </TouchableOpacity>
}

const styles = StyleSheet.create({
  containerStyle:{
    margin:10,
    borderRadius:20,
    borderWidth:2,
    alignItems:'center',
    justifyContent:'center'
  },
  textStyle:{
    padding:5,
    fontSize:16,
    fontWeight:'600'
  }
});
export default Button;