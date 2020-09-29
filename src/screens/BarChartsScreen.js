import React, { useContext } from 'react';
import { StyleSheet, View, TouchableOpacity, Image } from 'react-native';
import { Context as DataContext } from '../Context/DataContext';
import RunsBarChart from '../components/RunsBarChart';
import Icon from 'react-native-vector-icons/AntDesign';

const defaultColor = '#f0245a';

const BarChartScreen = ({ navigation }) => {
  const { State } = useContext(DataContext);
  let team1Overs = [0];
  let team2Overs = [0];
  if (State.team1Batting.runHistory.length >= 6) {
    team1Overs.push(State.team1Batting.runHistory[5]);
    for (let i = 1; i < Math.floor(State.team1Batting.runHistory.length / 6); i++) {
      team1Overs.push(State.team1Batting.runHistory[(i + 1) * 6 - 1] - State.team1Batting.runHistory[i * 6 - 1])
    }
    if (State.team1Batting.runHistory.length % 6 !== 0) {
      team1Overs.push(State.team1Batting.runHistory[State.team1Batting.runHistory.length - 1] -
        State.team1Batting.runHistory[Math.floor(State.team1Batting.runHistory.length / 6) * 6 - 1])
    }
  } else {
    team1Overs.push(State.team1Batting.runHistory[State.team1Batting.runHistory.length - 1])
  }
  if (State.team2Batting.runHistory.length >= 6) {
    team2Overs.push(State.team2Batting.runHistory[5]);
    for (let i = 1; i < Math.floor(State.team2Batting.runHistory.length / 6); i++) {
      team2Overs.push(State.team2Batting.runHistory[(i + 1) * 6 - 1] - State.team2Batting.runHistory[i * 6 - 1])
    }
    if (State.team2Batting.runHistory.length % 6 !== 0) {
      team2Overs.push(State.team2Batting.runHistory[State.team2Batting.runHistory.length - 1] -
        State.team2Batting.runHistory[Math.floor(State.team2Batting.runHistory.length / 6) * 6 - 1])
    }
  } else {
    team2Overs.push(State.team2Batting.runHistory[State.team2Batting.runHistory.length - 1])
  }

  if (team1Overs.length !== team2Overs.length) {
    const minimum = team1Overs.length > team1Overs.length
      ? team1Overs.length
      : team2Overs.length;
    if (minimum === team1Overs.length) {
      for (let i = minimum; i <= team2Overs.length; i++) {
        team1Overs.push(0);
      }
    } else {
      for (let i = minimum; i <= team1Overs.length; i++) {
        team2Overs.push(0);
      }
    }
  }
  let maximum = 0;
  for(var i =0 ;i<team1Overs.length;i++){
    maximum = maximum>team1Overs[i]?maximum:team1Overs[i];
    maximum = maximum>team2Overs[i]?maximum:team2Overs[i];
  }
  const data1 = team1Overs
    .map((value) => ({ value }));
  const data2 = team2Overs
    .map((value) => ({ value }));
  const barData = [
    {
      data: State.battingTeam === 'team1' ? data2 : data1,
      svg: {
        fill: '#05E4B5'

      },
    },
    {
      data: State.battingTeam === 'team1' ? data1 : data2,
      svg: {
        fill: '#7659FB'
      },
    },
  ]
  return <View>
    <View style={{
      flexDirection: 'row',
      height: 65, backgroundColor: '#f0245a'
    }}>
      <View style={{ flex: .9, alignItems: 'flex-start', justifyContent: 'center' }}>
        <TouchableOpacity onPress={navigation.openDrawer}>
          <Icon
            style={{ marginLeft: 10, marginTop: 10 }}
            name='bars'
            size={26}
            color='#515452'
          />
        </TouchableOpacity>
      </View>
      <View style={{ flex: 1.1, alignItems: 'flex-start', justifyContent: 'center' }}>
        <Image
          source={require('../../assets/logo1.png')}
          style={{
            height: 50,
            width: 50, marginTop: 10
          }}
        />
      </View>
    </View>
    <View style={{justifyContent:'center',alignItems:'center'}}>
      <RunsBarChart
        maximum={maximum}
        data={barData}
        team1={State.team1Batting === 'team1' ? State.team2Name : State.team1Name}
        team2={State.team1Batting === 'team1' ? State.team1Name : State.team2Name}
      />
    </View>

  </View>

}

const styles = StyleSheet.create({

});

export { BarChartScreen };

