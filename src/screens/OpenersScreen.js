import React, { useReducer, useContext } from 'react';
import { StyleSheet, KeyboardAvoidingView, Text, View } from 'react-native';
import SlideList from '../components/SlideList';
import { Context as DataContext } from '../Context/DataContext';
import Button from '../components/Button';

const defaultColor = '#f0245a';

const reducer = (state, action) => {
  switch (action.type) {
    case 'striker': {
      //const nonStrikerContenders = state.strikerContenders.filter((item) => item !== action.payload.selected);
      return {
        ...state,
        striker: { isClicked: action.payload.isClicked, selected: action.payload.selected }
        // nonStrikerContenders: [...nonStrikerContenders]
      }
    }
    case 'non_striker': {
      //const strikerContenders = state.nonStrikerContenders.filter((item) => item !== action.payload.selected);
      return {
        ...state,
        nonStriker: { isClicked: action.payload.isClicked, selected: action.payload.selected }
        //strikerContenders: [...strikerContenders]
      }
    }
    case 'opening_bowler': {
      return {
        ...state,
        openingBowler: { isClicked: action.payload.isClicked, selected: action.payload.selected }
      }
    }
    default:
      return state;
  }
}

const OpenersScreen = ({ navigation }) => {

  const { State, setOpening } = useContext(DataContext);
  //console.log(State);
  let strikerContenders = [];
  let nonStrikerContenders = [];
  let openingBowlerContenders = [];
  if (State.battingTeam === 'team1') {
    State.team1Batting.batsmen.forEach((item) => {
      strikerContenders.push(item.name);
      nonStrikerContenders.push(item.name);
    })
    State.team2Bowling.forEach((item) => openingBowlerContenders.push(item.name));
  } else {
    State.team2Batting.batsmen.forEach((item) => {
      strikerContenders.push(item.name);
      nonStrikerContenders.push(item.name);
    })
    State.team1Bowling.forEach((item) => openingBowlerContenders.push(item.name));
  }
  //console.log(strikerContenders, openingBowlerContenders);
  const [startingLineUp, dispatch] = useReducer(reducer, {
    striker: { isClicked: false, selected: '' },
    nonStriker: { isClicked: false, selected: '' },
    openingBowler: { isClicked: false, selected: '' },
    strikerContenders: [...strikerContenders],
    nonStrikerContenders: [...nonStrikerContenders],
    openingBowlerContenders: [...openingBowlerContenders]
  })
  const inputValidation = startingLineUp.striker.selected !== '' &&
    startingLineUp.nonStriker.selected !== '' &&
    startingLineUp.openingBowler.selected !== '';
  return <KeyboardAvoidingView>
    <View style={{ flexDirection: 'row', margin: 3 }}>
      <View style={{ flex: 2 }}>
        <Text style={{ color: '#f0245a', alignSelf: 'center' }}>Striker: </Text>
      </View>
      <View style={{ flex: 4 }}>
        <SlideList
          data={startingLineUp.strikerContenders}
          value={startingLineUp.striker}
          onSelect={(isClicked, selected) => dispatch({ type: 'striker', payload: { isClicked, selected } })}
        />
      </View>
    </View>

    <View style={{ flexDirection: 'row', margin: 3 }}>
      <View style={{ flex: 2 }}>
        <Text style={{ color: '#f0245a', alignSelf: 'center' }}>Non striker: </Text>
      </View>
      <View style={{ flex: 4 }}>
        <SlideList
          data={startingLineUp.nonStrikerContenders}
          value={startingLineUp.nonStriker}
          onSelect={(isClicked, selected) => dispatch({ type: 'non_striker', payload: { isClicked, selected } })}
        />
      </View>
    </View>

    <View style={{ flexDirection: 'row', margin: 3 }}>
      <View style={{ flex: 2 }}>
        <Text style={{ color: '#f0245a', alignSelf: 'center' }}>Opening Bowler: </Text>
      </View>
      <View style={{ flex: 4 }}>
        <SlideList
          data={startingLineUp.openingBowlerContenders}
          value={startingLineUp.openingBowler}
          onSelect={(isClicked, selected) => dispatch({ type: 'opening_bowler', payload: { isClicked, selected } })}
        />
      </View>
    </View>
    <Button
      disabled={!inputValidation}
      name='create team'
      color='#f0245a'
      onPress={() => {
        setOpening({
          striker: startingLineUp.striker.selected,
          nonStriker: startingLineUp.nonStriker.selected,
          openingBowler: startingLineUp.openingBowler.selected
        });
        navigation.navigate('Main');
      }}
    />
  </KeyboardAvoidingView>

}

const styles = StyleSheet.create({

});
export { OpenersScreen };