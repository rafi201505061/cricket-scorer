import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const defaultColor = '#f0245a';

const ScoreCardHeader = () => {
  const objects = ['Name', 'Runs', 'Balls', '4s', '6s', 'S.R.']
  return <View style={styles.containerStyle}>
    <View style={{...styles.textWrapperStyle,flex:5}}>
      <Text style={styles.textStyle}>Name</Text>
    </View>
    <View style={{...styles.textWrapperStyle,flex:1}}>
      <Text style={styles.textStyle}>R</Text>
    </View>
    <View style={{...styles.textWrapperStyle,flex:1}}>
      <Text style={styles.textStyle}>B</Text>
    </View>
    <View style={{...styles.textWrapperStyle,flex:.7}}>
      <Text style={styles.textStyle}>4</Text>
    </View>
    <View style={{...styles.textWrapperStyle,flex:.7}}>
      <Text style={styles.textStyle}>6</Text>
    </View>
    <View style={{...styles.textWrapperStyle,flex:1.5}}>
      <Text style={styles.textStyle}>SR</Text>
    </View>
  </View>

}

const styles = StyleSheet.create({
  containerStyle: {
    flexDirection: 'row',
    borderWidth: 2,
    borderColor: defaultColor,
    backgroundColor:'#515452'
  },
  textStyle: {
    fontSize: 16,
    fontWeight: '500',
    color: defaultColor
  },
  textWrapperStyle:{
    alignItems:'center',
    justifyContent:'center',
    borderRightWidth:1,
    borderRightColor:defaultColor
  }
});

export default ScoreCardHeader;