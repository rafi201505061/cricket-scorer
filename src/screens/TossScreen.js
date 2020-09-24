import React, { useState,useContext } from 'react';
import { StyleSheet, View } from 'react-native';
import Button from '../components/Button';
import ToggleGroup from '../components/ToggleGroup';
import {Context as ThemeContext}  from '../Context/ThemeContext';

const TossScreen = ({ navigation }) => {
  const {State} = useContext(ThemeContext);
  const team1Name = navigation.getParam('team1Name');
  const team2Name = navigation.getParam('team2Name');
  const overs = navigation.getParam('overs');
  const numPlayers = navigation.getParam('numPlayers');
  const [state, setState] = useState({ selected: team1Name, one: true, two: false })
  const [state1, setState1] = useState({ selected: 'Bat', one: true, two: false })

  return (
    <View style={{ flex: 1, justifyContent: 'center', marginBottom: 100 }}>
      <ToggleGroup
        item1={team1Name}
        item2={team2Name}
        header="Toss Won By:"
        state={state}
        onPress1={() => setState({ selected: team1Name, one: true, two: false })}
        onPress2={() => setState({ selected: team2Name, one: false, two: true })}
        color={State.defaultColor}
      />
      <ToggleGroup
        item1="Bat"
        item2="Bowl"
        header="Chose To:"
        state={state1}
        onPress1={() => setState1({ selected: 'Bat', one: true, two: false })}
        onPress2={() => setState1({ selected: 'Bowl', one: false, two: true })}
        color = {State.defaultColor}
      />
      <Button
        name="Next"
        onPress={() => navigation.navigate('Openers',
          {
            team1Name, team2Name, overs, numPlayers, tossWinner: state.selected,
            choseTo: state1.selected
          })
        }
        color={State.defaultColor}
      />
    </View>

  )
}

TossScreen.navigationOptions = ({ navigation }) => {
  return {
    title: "Toss Information",
  }
};

const styles = StyleSheet.create({

});

export { TossScreen };