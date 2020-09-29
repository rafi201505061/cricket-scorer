import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign'

const Card = ({ data, onPress,onDelete }) => {
  return <TouchableOpacity onPress={onPress}>
    <View style={styles.headerStyle}>
      <View>
        <View style={{ flexDirection: 'row', justifyContent: 'flex-start' }}>
          <Text style={styles.teamNameStyle}>{data.team1Name}</Text>
          <Text style={styles.otherTextStyle}> vs </Text>
          <Text style={styles.teamNameStyle}>{data.team2Name}</Text>
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'flex-start' }}>
          <Text style={styles.otherTextStyle}> {data.date} </Text>
          <Text style={styles.otherTextStyle}> {data.time} </Text>
        </View>
      </View>
      <View style={{ justifyContent: 'center', alignItems: 'center' }}>
        <TouchableOpacity onPress={onDelete}>
          <Icon
            style={{ margin: 8 }}
            name='delete'
            size={24}
            color='#f0245a'
          />
        </TouchableOpacity>
      </View>
    </View>
  </TouchableOpacity>
}

const styles = StyleSheet.create({
  headerStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderColor: '#f0245a',
    borderWidth: 2,
    marginBottom: 2,
    marginTop: 2,
    shadowColor: '#f0245a'
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
    margin: 4,
    alignSelf: 'center'

  }
})
export default Card;