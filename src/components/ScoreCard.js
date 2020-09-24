import React from 'react';
import { StyleSheet, Text, FlatList, View } from 'react-native';
import ScoreCardRow from './ScoreCardRow';
import ScoreCardHeader from './ScoreCardHeader';

const defaultColor = '#f0245a';

const ScoreCard = ({ playerInfos, teamInfo,teamName,target }) => {
  return <View>
    <View style={styles.scoreHeaderStyle}>
      <View style={{...styles.textWrapperStyle,flex:1}}>
        <Text style={styles.textStyle}>{teamName}</Text>
      </View>
      <View style={{...styles.textWrapperStyle,flex:1}}>
        <Text style={styles.textStyle}>Score:{teamInfo.runs}/{teamInfo.wickets}</Text>
        {target?<Text style={{color:defaultColor,alignSelf:'center'}}>Target:{target}</Text>:null}
      </View>
      <View style={{...styles.textWrapperStyle,flex:1}}>
        <Text style={styles.textStyle}>Overs:{Math.floor(teamInfo.overs/6)}.{teamInfo.overs%6}</Text>
      </View>
    </View>
    <View style={{backgroundColor:'#515452'}}>
    {target?<Text style={{color:defaultColor,alignSelf:'center'}}>{target-teamInfo.runs} required from {teamInfo.totalOvers-teamInfo.overs} balls</Text>:null}
    
    </View>
    <ScoreCardHeader/>
    {playerInfos.map((item)=><ScoreCardRow key={item.name+item.balls+item.runs+item.battingPosition}
     playerInfo={item}/>)}
  </View>
}

const styles = StyleSheet.create({
  scoreHeaderStyle: {
    flexDirection: 'row',
    backgroundColor:'#515452'
  },
  textStyle:{
    fontSize: 16,
    fontWeight: '500',
    color: defaultColor
  },
  textWrapperStyle:{
    alignItems:'center',
    justifyContent:'center'
  }
});

export default ScoreCard;