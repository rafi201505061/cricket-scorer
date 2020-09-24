import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import { StyleSheet, Text, View } from 'react-native';

const defaultColor = '#f0245a';

const outString = (action) => {

  switch(action.type){
    case 'Bowled':
      return `b ${action.payload.bowler}`;
    case 'Hit_out':
      return `Hit out ${action.payload.bowler}`;
    case 'LBW':
      return `lbw ${action.payload.bowler}`;
    case 'caught':
      if(action.payload.catcher === action.payload.bowler){
        return `c&b ${action.payload.bowler}`;
      }
      else{
        return `c ${action.payload.catcher} b ${action.payload.bowler}`;
      }
    case 'stumped':
      return `st ${action.payload.stumper} b ${action.payload.bowler}`;
    case 'run out':
      return `run out ${action.payload.thrower}`;
    default:
      return '';
  }
}

const ScoreCardRow = ({ playerInfo }) => {


  return <View style={styles.containerStyle}>
    <View style={{ ...styles.textWrapperStyle, flex: 5, flexDirection: 'row' }}>
      <Text style={{ ...styles.textStyle, flex: playerInfo.onStrike?2:1 }}>{playerInfo.name}</Text>
      {playerInfo.onStrike ? <Icon
        styles={{ flex: 1 }}
        name='star'
        size={14}
        color={defaultColor}
      /> : null
      }
      {playerInfo.out === true
        ? <Text style={{color:defaultColor,fontSize:12}}>
        {outString({type:playerInfo.type,payload:{
          catcher:playerInfo.catcher,
          thrower:playerInfo.thrower,
          bowler:playerInfo.bowler,
          stumper:playerInfo.stumper
          }})}</Text>
        : null
      }
    </View>
    <View style={{ ...styles.textWrapperStyle, flex: 2 }}>
      <Text style={styles.textStyle}>{playerInfo.balls !== 0 ? playerInfo.runs : ''}</Text>
    </View>
    <View style={{ ...styles.textWrapperStyle, flex: 2 }}>
      <Text style={styles.textStyle}>{playerInfo.balls !== 0 ? playerInfo.balls : ''}</Text>
    </View>
    <View style={{ ...styles.textWrapperStyle, flex: 1.2 }}>
      <Text style={styles.textStyle}>{playerInfo.balls !== 0 ? playerInfo.fours : ''}</Text>
    </View>
    <View style={{ ...styles.textWrapperStyle, flex: 1.2 }}>
      <Text style={styles.textStyle}>{playerInfo.balls !== 0 ? playerInfo.sixes : ''}</Text>
    </View>
    <View style={{ ...styles.textWrapperStyle, flex: 2 }}>
      <Text style={styles.textStyle}>{playerInfo.balls !== 0 ? (((playerInfo.runs * 1.0) / playerInfo.balls) * 100.0).toFixed(2) : ''}</Text>
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
  }
});

export default ScoreCardRow;