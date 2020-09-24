import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

const defaultColor = '#f0245a';

const RoundButton = ({ onPress, color, name, size, calledBy, backGroundColor }) => {
  const type = calledBy ? calledBy : name;
  return <TouchableOpacity onPress={() => onPress(type, name)}>
    <View style={{
      ...styles.containerStyle, height: size, width: size,
      borderColor: color, backgroundColor: backGroundColor
    }}>
      <Text style={{ ...styles.textStyle, color: color }}>
        {name}
      </Text>
    </View>
  </TouchableOpacity>
}

const styles = StyleSheet.create({
  containerStyle: {
    borderRadius: 100,
    borderWidth: 2,
    justifyContent: 'center'
  },
  textStyle: {
    alignSelf: 'center',
    fontWeight: '600',
    fontSize: 16
  }
});

export default RoundButton;