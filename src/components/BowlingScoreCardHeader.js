import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const defaultColor = '#f0245a';

const BowlingScoreCardHeader = () => {
  return <View style={styles.containerStyle}>
    <View style={{...styles.textWrapperStyle,flex:5}}>
      <Text style={styles.textStyle}>Name</Text>
    </View>
    <View style={{...styles.textWrapperStyle,flex:1}}>
      <Text style={styles.textStyle}>O</Text>
    </View>
    <View style={{...styles.textWrapperStyle,flex:1}}>
      <Text style={styles.textStyle}>R</Text>
    </View>
    <View style={{...styles.textWrapperStyle,flex:.7}}>
      <Text style={styles.textStyle}>W</Text>
    </View>
    <View style={{...styles.textWrapperStyle,flex:.7}}>
      <Text style={styles.textStyle}>Dot</Text>
    </View>
    <View style={{...styles.textWrapperStyle,flex:1.5}}>
      <Text style={styles.textStyle}>Econ</Text>
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

export default BowlingScoreCardHeader;