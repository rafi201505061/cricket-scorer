import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';

const Card = ({ data,onPress }) => {
  return <TouchableOpacity onPress={onPress}>
    <View style={styles.headerStyle}>
      <View style={{ flexDirection: 'row',justifyContent:'center' }}>
        <Text style={styles.teamNameStyle}>{data.team1Name}</Text>
        <Text style={styles.otherTextStyle}> vs </Text>
        <Text style={styles.teamNameStyle}>{data.team2Name}</Text>
      </View>
      <View style={{ flexDirection: 'row',justifyContent:'center' }}>
        <Text style={styles.otherTextStyle}> {data.time} </Text>
        <Text style={styles.otherTextStyle}> {data.date} </Text>
      </View>
    </View>
  </TouchableOpacity>

}

const styles = StyleSheet.create({
  headerStyle: {
    justifyContent: 'center',
    borderColor: '#f0245a',
    borderWidth: 2,
    marginBottom: 2,
    marginTop:2,
    shadowColor:'#f0245a'
  },
  teamNameStyle: {
    fontSize: 18,
    fontWeight: "500",
    color: '#f0245a',
    margin: 4
  },
  otherTextStyle: {
    fontSize: 12,
    fontWeight: "400",
    color: '#f0245a',
    margin: 4
  }
})
export default Card;