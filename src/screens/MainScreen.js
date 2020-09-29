import React, { useContext, useState, useReducer, useEffect } from 'react';
import { StyleSheet, View, Image, TouchableOpacity, BackHandler } from 'react-native';
import Alert from '../components/Alert';
import { Context as DataContext } from '../Context/DataContext';
import ButtonGroup from '../components/ButtonGroup';
import ScoreCard from '../components/ScoreCard';
import BowlingScoreCard from '../components/BowlingScoreCard';
import ThisOver from '../components/ThisOver';
import CusBottomSheet from '../components/CusBottomSheet';
import RoundButton from '../components/RoundButton';
import CusModal from '../components/CusModal';
import Icon from 'react-native-vector-icons/AntDesign';
import Button from '../components/Button';
import ModalInningsChange from '../components/ModalInningsChange';
import ModalGameOver from '../components/ModalGameOver';
import AsyncStorage from '@react-native-community/async-storage';

const defaultColor = '#f0245a';
const saveMatch = async (state, callback) => {
  //console.log(state);
  var today = new Date();
  var date = today.getFullYear().toString() + '-'
    + (today.getMonth() + 1).toString() + '-' + today.getDate().toString();
  var time = today.getHours().toString() + ":"
    + today.getMinutes().toString() + ":" + today.getSeconds().toString();
  var matchId = date + '-' + time;
  AsyncStorage.getItem('matches')
    .then((matches) => {
      const c = matches ? JSON.parse(matches) : [];
      c.push(JSON.stringify({ ...state, matchId }));
      AsyncStorage.setItem('matches', JSON.stringify(c));
      callback();
    });
}
const reducer = (state, action) => {
  switch (action.type) {
    case 'striker':
      return {
        ...state,
        striker: {
          isClicked: action.payload.isClicked,
          selected: action.payload.selected
        }
      };
    case 'non_striker':
      return {
        ...state,
        nonStriker: {
          isClicked: action.payload.isClicked,
          selected: action.payload.selected
        }
      }
    case 'opening_bowler':
      return {
        ...state,
        openingBowler: {
          isClicked: action.payload.isClicked,
          selected: action.payload.selected
        }
      }
    default:
      return state;
  }
}

const MainScreen = ({ navigation }) => {
  //const { State, setColor } = useContext(ThemeContext);

  const { changeInnings, State, addRuns, setNextBowler, changeBowler, changeBowlerVisibility } = useContext(DataContext);
  const [bottomSheet, setBottomSheet] = useState({
    isVisible: false,
    calledBy: ''
  });
  const [showWicketBottomSheet, setShowWicketBottomSheet] = useState({
    isVisible: false,
    type: '0'
  });
  const [nextBowler, selectNextBowler] = useState({
    isClicked: false,
    selected: ''
  });
  const [changedBowler, setChangedBowler] = useState({
    isClicked: false,
    selected: ''
  });
  const [inningsChangeDetails, dispatch] = useReducer(reducer, {
    striker: { isClicked: false, seleted: '' },
    nonStriker: { isClicked: false, seleted: '' },
    openingBowler: { isClicked: false, seleted: '' }
  })
  const [showAlert, setShowAlert] = useState(false);

  const numFunc = (type, payload) => addRuns(type, payload);
  const func2 = (type, payload) => setBottomSheet({
    isVisible: true,
    calledBy: type
  });
  const func3 = (type, payload) => {
    setBottomSheet({
      ...bottomSheet,
      isVisible: false
    });
    addRuns(type, payload);
  }
  const func4 = (type, payload) => setShowWicketBottomSheet({
    ...showWicketBottomSheet,
    type: payload
  });
  const buttons = [
    [{ name: '0', callback: numFunc },
    { name: '1', callback: numFunc },
    { name: '2', callback: numFunc },
    { name: '3', callback: numFunc },
    { name: '4', callback: numFunc },
    { name: '5', callback: numFunc }],
    [{ name: '6', callback: numFunc },
    { name: 'Wd', callback: func2 },
    { name: 'N', callback: func2 },
    { name: 'B', callback: func2 },
    { name: 'LB', callback: func2 }]];
  const bottomSheetdata = [
    { name: '0', callback: func3 },
    { name: '1', callback: func3 },
    { name: '2', callback: func3 },
    { name: '3', callback: func3 },
    { name: '4', callback: func3 },
    { name: '5', callback: func3 },
    { name: '6', callback: func3 }]
  const wicketBottomSheetData = [
    { name: 'C', callback: func4 },
    { name: 'B', callback: func4 },
    { name: 'RO', callback: func4 },
    { name: 'LBW', callback: func4 },
    { name: 'St', callback: func4 },
    { name: 'M.kd', callback: func4 },
    { name: 'HO', callback: func4 }
  ]

  let bowlerContenders = [];
  let battingContenders = [];
  let fielders = [];
  if (State.bowlingTeam === 'team1') {
    State.team1Bowling.forEach((item) => {
      if (State.Bowler.name !== item.name) {
        bowlerContenders.push(item.name);
      }
      fielders.push(item.name);
    })
  } else if (State.bowlingTeam === 'team2') {
    State.team2Bowling.forEach((item) => {
      if (State.Bowler.name !== item.name) {
        bowlerContenders.push(item.name);
      }
      fielders.push(item.name);
    })
  }

  if (State.battingTeam === 'team1') {
    State.team1Batting.batsmen.forEach((item) => {
      if (item.out === false) {
        battingContenders.push(item.name);
      }
    })
  } else if (State.battingTeam === 'team2') {
    State.team2Batting.batsmen.forEach((item) => {
      if (item.out === false) {
        battingContenders.push(item.name);
      }
    })
  }

  battingContenders = battingContenders.filter(
    (item) => item !== State.player1.name && item !== State.player2.name
  );

  let inningsChangeData = { batsmen: [], bowlers: [] }
  if (State.inningsChange === true) {
    if (State.battingTeam === 'team1') {
      State.team1Batting.batsmen.forEach((item) => {
        inningsChangeData.bowlers.push(item.name);
      })
      State.team2Batting.batsmen.forEach((item) => {
        inningsChangeData.batsmen.push(item.name);
      })
    } else {
      State.team1Batting.batsmen.forEach((item) => {
        inningsChangeData.batsmen.push(item.name);
      })
      State.team2Batting.batsmen.forEach((item) => {
        inningsChangeData.bowlers.push(item.name);
      })
    }

  }
  //console.log(State.inningsChange,State.modalVisible);

  useEffect(() => {
    const listener = BackHandler.addEventListener('hardwareBackPress', () => {
      navigation.goBack(null);
      return true;
    });
    return () => listener.remove()
  }, [])

  return <>
    <View style={{
      flexDirection: 'row',
      height: 65, backgroundColor: '#f0245a'
    }}>
      <View style={{ flex: .9, alignItems: 'flex-start', justifyContent: 'center' }}>
        <TouchableOpacity onPress={() => setShowAlert(true)}>
          <Icon
            style={{ marginLeft: 10,marginTop:10 }}
            name='home'
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
    {
      showAlert
        ? <Alert
          isVisible={showAlert}
          header='Current progress will be lost.Do you want to continue?'
          nfAction={() => setShowAlert(false)}
          pfAction={() => {
            setShowAlert(false);
            navigation.navigate('Home');
          }}
        />
        : null
    }
    <ScoreCard
      playerInfos={[State.player1, State.player2]}
      teamInfo={State.battingTeam === 'team1'
        ? { ...State.team1Batting, totalOvers: State.oversPerSide * 6 }
        : { ...State.team2Batting, totalOvers: State.oversPerSide * 6 }}
      teamName={State.battingTeam === 'team1' ? State.team1Name : State.team2Name}
      target={State.noOfInnings === 1
        ? State.battingTeam === 'team1'
          ? State.team2Batting.runs + 1
          : State.team1Batting.runs + 1
        : null}
    />
    <BowlingScoreCard
      playerInfos={[State.Bowler]}
    />
    <ThisOver data={State.ThisOver} />
    <ButtonGroup
      size={40}
      data={buttons}
    />
    {bottomSheet.isVisible ?
      <CusBottomSheet
        dataList={{
          onStrikeBatsmen: [State.player1.name, State.player2.name],
          fielders,
          battingContenders
        }}
        isVisible={bottomSheet.isVisible}
        data={bottomSheetdata}
        calledBy={bottomSheet.calledBy}
        changeVisibility={() => setBottomSheet({ ...bottomSheet, isVisible: false })}
        header='How many runs are scored in this ball?'
        type='0'
      /> : null}
    <View style={{ justifyContent: 'center', alignItems: 'center', flexDirection: 'row' }}>
      <Button name='Change Bowler' color='#f0245a' onPress={() => {
        changeBowlerVisibility()
      }} />
      <RoundButton
        name='Wkt'
        size={45}
        color='#f0245a'
        onPress={(type, payload) => setShowWicketBottomSheet(
          {
            ...showWicketBottomSheet,
            isVisible: true
          })}
      />
    </View>
    {showWicketBottomSheet.isVisible ?
      <CusBottomSheet
        dataList={{
          onStrikeBatsmen: [State.player1.name, State.player2.name],
          fielders,
          battingContenders
        }}
        isVisible={showWicketBottomSheet.isVisible}
        data={wicketBottomSheetData}
        calledBy='Wkt'
        changeVisibility={() => setShowWicketBottomSheet({ type: '0', isVisible: false })}
        header='Type of wicket:'
        type={showWicketBottomSheet.type}
      /> : null}
    {
      State.gameFinished ? <ModalGameOver
        isVisible={State.gameFinished}
        modalText='Game is Over'
        onSubmit={() => saveMatch(State, () => { navigation.navigate('Home') })}
      /> : null
    }
    {
      State.inningsChange ?
        <ModalInningsChange
          disabled={
            inningsChangeDetails.striker.selected === inningsChangeDetails.nonStriker.selected
              ? true 
              : false
          }
          data={inningsChangeData}
          modalText='Change Innings.'
          isVisible={State.inningsChange}
          slideListValues={inningsChangeDetails}
          onSelectNonStriker={(isClicked, selected) => dispatch({
            type: 'non_striker',
            payload: { isClicked, selected }
          })}
          onSelectOpeningBowler={(isClicked, selected) => dispatch({
            type: 'opening_bowler',
            payload: { isClicked, selected }
          })}
          onSelectStriker={(isClicked, selected) => dispatch({
            type: 'striker',
            payload: { isClicked, selected }
          })}
          onSubmit={() => changeInnings(inningsChangeDetails)}
        /> : null
    }
    {State.modalVisible
      ? <CusModal
        data={bowlerContenders}
        modalText='This over is complete.Select next bowler.'
        isVisible={State.modalVisible}
        slideListValue={nextBowler}
        onSelect={(isClicked, selected) => selectNextBowler({ isClicked, selected })}
        onSubmit={() => {
          setNextBowler(nextBowler.selected);
          selectNextBowler({ isClicked: false, selected: '' })
        }}
      />
      : null
    }
    {State.changeBowler
      ? <CusModal
        data={bowlerContenders}
        modalText='Current bowler is injured? Select next bowler.'
        isVisible={State.changeBowler}
        slideListValue={changedBowler}
        onSelect={(isClicked, selected) => setChangedBowler({ isClicked, selected })}
        onSubmit={() => {
          changeBowler(changedBowler.selected);
          setChangedBowler({ isClicked: false, selected: '' })
        }
        }
      />
      : null
    }
  </>
}

MainScreen.navigationOptions = ({ navigation }) => {
  return {
    headerTitle: () => <Image
      source={require('../../assets/logo1.png')}
      style={{
        height: 50,
        width: 50,
        alignSelf: 'center'
      }}
    />,
    headerLeft: () => null
  }
};
const styles = StyleSheet.create({

});

export { MainScreen };