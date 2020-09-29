import React, { useContext } from 'react';
import { StyleSheet, TouchableOpacity, View ,Image} from 'react-native';
import RunsLineChart from '../components/RunsLineChart';
import { Context as DataContext } from '../Context/DataContext';
import Icon from 'react-native-vector-icons/AntDesign';

const defaultColor = '#f0245a';

const LineChartScreen = ({ navigation }) => {
  const { State } = useContext(DataContext);
  return <View>
    <View style={{
      flexDirection: 'row',
      height: 65, backgroundColor: '#f0245a'
    }}>
      <View style={{ flex: .9, alignItems: 'flex-start', justifyContent: 'center' }}>
        <TouchableOpacity onPress={navigation.openDrawer}>
          <Icon
            style={{ marginLeft: 10,marginTop:10 }}
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
            width: 50,marginTop:10
          }}
        />
      </View>
    </View>
    <RunsLineChart
      data={[
        {
          data: State.battingTeam === 'team1'
            ? [...State.team2Batting.runHistory]
            : [...State.team1Batting.runHistory],
          svg: { stroke: '#05E4B5' },
        },
        {
          data: State.battingTeam === 'team1'
            ? [...State.team1Batting.runHistory]
            : [...State.team2Batting.runHistory],
          svg: { stroke: '#7659FB' },
        },
      ]}
      team1={State.team1Batting === 'team1' ? State.team2Name : State.team1Name}
      team2={State.team1Batting === 'team1' ? State.team1Name : State.team2Name}
    />
  </View>
}

const styles = StyleSheet.create({

});

export { LineChartScreen };

