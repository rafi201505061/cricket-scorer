import React, { useContext, useReducer, useState, useEffect, useFocusEffect } from 'react';
import { StyleSheet, Alert, ScrollView, View, Image,BackHandler } from 'react-native';
import Button from '../components/Button';
import { Context as DataContext } from '../Context/DataContext';
import ScoreCard from '../components/ScoreCard';
import BowlingScoreCard from '../components/BowlingScoreCard';

const defaultColor = '#f0245a';
const reducer = (state, action) => {
  switch (action.type) {
    case '1': {
      let batsmenInfos = [], bowlersInfos = [];
      let battingTeamInfo = {};
      let battingTeamName = '';
      state.storedState.battingTeam === 'team1'
        ? state.storedState.team2Batting.batsmen.map((item) => batsmenInfos.push({ ...item, onStrike: false }))
        : state.storedState.team1Batting.batsmen.map((item) => batsmenInfos.push({ ...item, onStrike: false }));
      battingTeamInfo = state.storedState.battingTeam === 'team1'
        ? {
          runs: state.storedState.team2Batting.runs,
          wickets: state.storedState.team2Batting.wickets,
          overs: state.storedState.team2Batting.overs
        }
        : {
          runs: state.storedState.team1Batting.runs,
          wickets: state.storedState.team1Batting.wickets,
          overs: state.storedState.team1Batting.overs
        }
      battingTeamName = state.storedState.battingTeam === 'team1'
        ? state.storedState.team2Name
        : state.storedState.team1Name;
      let temp = [], temp2 = [];
      temp = batsmenInfos.filter((item) => item.battingPosition !== -1);
      temp2 = batsmenInfos.filter((item) => item.battingPosition === -1);
      temp.sort((a, b) => a.battingPosition > b.battingPosition);
      batsmenInfos = temp;
      temp2.map((item) => batsmenInfos.push(item));
      bowlersInfos = state.storedState.bowlingTeam === 'team1'
        ? state.storedState.team2Bowling
        : state.storedState.team1Bowling
      return {
        ...state,
        battingTeamName,
        battingTeamInfo,
        batsmenInfos,
        bowlersInfos: bowlersInfos.filter((item) => item.overs !== 0).sort((a, b) => a.bowlingPosition > b.bowlingPosition)
      }

    }
    case '2': {
      let batsmenInfos = [], bowlersInfos = [];
      let battingTeamInfo = {};
      let battingTeamName = '';
      state.storedState.battingTeam === 'team1'
        ? state.storedState.team1Batting.batsmen.map((item) => batsmenInfos.push({ ...item, onStrike: false }))
        : state.storedState.team2Batting.batsmen.map((item) => batsmenInfos.push({ ...item, onStrike: false }));
      battingTeamInfo = state.storedState.battingTeam === 'team1'
        ? {
          runs: state.storedState.team1Batting.runs,
          wickets: state.storedState.team1Batting.wickets,
          overs: state.storedState.team1Batting.overs
        }
        : {
          runs: state.storedState.team2Batting.runs,
          wickets: state.storedState.team2Batting.wickets,
          overs: state.storedState.team2Batting.overs
        }
      battingTeamName = state.storedState.battingTeam === 'team1'
        ? state.storedState.team1Name : state.storedState.team2Name;
      let temp = [], temp2 = [];
      temp = batsmenInfos.filter((item) => item.battingPosition !== -1);
      temp2 = batsmenInfos.filter((item) => item.battingPosition === -1);
      temp.sort((a, b) => a.battingPosition > b.battingPosition);
      batsmenInfos = temp;
      temp2.map((item) => batsmenInfos.push(item));
      bowlersInfos = state.storedState.bowlingTeam === 'team1'
        ? state.storedState.team1Bowling
        : state.storedState.team2Bowling
      return {
        ...state,
        battingTeamName,
        battingTeamInfo,
        batsmenInfos,
        bowlersInfos: bowlersInfos.filter((item) => item.overs !== 0).sort((a, b) => a.bowlingPosition > b.bowlingPosition)
      }
    }
    default:
      return state;
  }
}
const ScoreCardScreen = ({ navigation }) => {
  const [buttonClicked, setButtonClicked] = useState({ clicked1: true, clicked2: false })
  const { State } = useContext(DataContext);
  const [infos, dispatch] = useReducer(reducer, {
    storedState: State,
    batsmenInfos: [],
    bowlersInfos: [],
    battingTeamName: '',
    battingTeamInfo: {}
  });

  useEffect(() => {
    dispatch({ type: '1' });
  }, []);


  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        Alert.alert(
          "You're still editing!",
          "Are you sure you want to go home with your edits not saved?",
          [
            { text: "Keep Editing", onPress: () => {}, style: "cancel" },
            { text: "Go Home", onPress: () => this.props.navigation.goBack() },
          ],
          { cancelable: false },
        );
        return true;
      };

      BackHandler.addEventListener('hardwareBackPress', onBackPress);

      return () =>
        BackHandler.removeEventListener('hardwareBackPress', onBackPress);
    }, [])
  );

  return <View>
    <View style={styles.headerStyle}>
      <View style={
        {
          borderRightColor: buttonClicked.clicked1 ? '#515452' : '#f0245a',
          borderRightWidth: 2,
          flex: 1,
          backgroundColor: buttonClicked.clicked1 ? '#f0245a' : '#515452'
        }}>
        <Button
          name={State.battingTeam === 'team1' ? `${State.team2Name} innings` : `${State.team1Name} innings`}
          onPress={() => {
            dispatch({ type: '1' });
            setButtonClicked({ clicked1: true, clicked2: false });
          }}
          color={buttonClicked.clicked1 ? '#515452' : '#f0245a'}
        />
      </View>
      <View style={{
        borderRightColor: buttonClicked.clicked2 ? '#515452' : '#f0245a',
        borderRightWidth: 2,
        flex: 1,
        backgroundColor: buttonClicked.clicked2 ? '#f0245a' : '#515452'
      }}>
        <Button
          name={State.battingTeam === 'team1' ? `${State.team1Name} innings` : `${State.team2Name} innings`}
          onPress={() => {
            dispatch({ type: '2' });
            setButtonClicked({ clicked1: false, clicked2: true });
          }}
          color={buttonClicked.clicked2 ? '#515452' : '#f0245a'}
        />
      </View>

    </View>
    <ScrollView>
      <ScoreCard playerInfos={infos.batsmenInfos} teamInfo={infos.battingTeamInfo} target='' teamName={infos.battingTeamName} />
      <BowlingScoreCard playerInfos={infos.bowlersInfos} />
    </ScrollView>

  </View>
}

ScoreCardScreen.navigationOptions = ({ navigation }) => {
  return {
    headerTitle: () => <Image source={require('../../assets/logo1.png')} style={{ height: 50, width: 50, margin: 4, marginLeft: 90 }} />
  }
};

const styles = StyleSheet.create({
  headerStyle: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderBottomColor: defaultColor,
    borderBottomWidth: 2
  }
});

export { ScoreCardScreen };

