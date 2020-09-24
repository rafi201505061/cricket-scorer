import React from 'react';
import { StyleSheet, Text, FlatList, View } from 'react-native';
import BowlingScoreCardRow from './BowlingScoreCardRow';
import BowlingScoreCardHeader from './BowlingScoreCardHeader';

const defaultColor = '#f0245a';

const BowlingScoreCard = ({ playerInfos }) => {
  return <View>
    <View style={styles.scoreHeaderStyle}>
      <Text style={styles.textStyle}>Bowling</Text>
    </View>
    <BowlingScoreCardHeader/>
    {playerInfos.map((item)=><BowlingScoreCardRow key={item.name} playerInfo={item}/>)}
  </View>
}

const styles = StyleSheet.create({
  scoreHeaderStyle: {
    flexDirection: 'row',
    backgroundColor:'#515452',
    justifyContent:'center'
  },
  textStyle:{
    fontSize: 16,
    fontWeight: '500',
    color: defaultColor
  }
});

export default BowlingScoreCard;