import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const defaultColor = '#f0245a';

const BowlingScoreCardRow = ({ playerInfo }) => {
  return <View style={styles.containerStyle}>
    <View style={{ ...styles.nameWrapper, flex: 5, flexDirection: 'row' }}>
      <Text style={{ ...styles.textStyle }}>{playerInfo.name}</Text>
    </View>
    <View style={{ ...styles.textWrapperStyle, flex: 2 }}>
      <Text style={styles.textStyle}>{Math.floor(playerInfo.overs/6)}.{playerInfo.overs%6}</Text>
    </View>
    <View style={{ ...styles.textWrapperStyle, flex: 2 }}>
      <Text style={styles.textStyle}>{playerInfo.runs}</Text>
    </View>
    <View style={{ ...styles.textWrapperStyle, flex: 1.2 }}>
      <Text style={styles.textStyle}>{playerInfo.wickets}</Text>
    </View>
    <View style={{ ...styles.textWrapperStyle, flex: 1.2 }}>
      <Text style={styles.textStyle}>{playerInfo.dots}</Text>
    </View>
    <View style={{ ...styles.textWrapperStyle, flex: 2 }}>
      <Text style={styles.textStyle}>{((playerInfo.runs/playerInfo.overs)*6.0).toFixed(2)}</Text>
    </View>
  </View>
}

const styles = StyleSheet.create({
  containerStyle: {
    flexDirection: 'row',
    borderTopWidth:0,
    borderColor: defaultColor,
    backgroundColor: '#f5faf6',
    borderBottomWidth:1,
    borderLeftWidth:1,
    borderRightWidth:1,
    height: 45
  },
  textStyle: {
    fontSize: 16,
    fontWeight: '500',
    color: defaultColor,
    paddingLeft: 3
  },
  textWrapperStyle: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRightWidth: 1,
    borderRightColor: defaultColor
  },
  nameWrapper:{
    alignItems: 'center',
    justifyContent: 'flex-start',
    borderRightWidth: 1,
    borderRightColor: defaultColor
  }
});

export default BowlingScoreCardRow;