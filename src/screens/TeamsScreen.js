import React, { useContext } from 'react';
import { StyleSheet, Text} from 'react-native';
import Form from '../components/Form';
import {Context as ThemeContext} from '../Context/ThemeContext';

const TeamsScreen = ({ navigation }) => {
  const {State} = useContext(ThemeContext);
  const overs = navigation.getParam('overs');
  const numPlayers = navigation.getParam('numPlayers');
  return (
      <Form label1="Team-1 Name"
        placeholder1="e.g. Bangladesh"
        errorMessage1=""
        label2="Team-2 Name"
        placeholder2="e.g. India"
        errorMessage2=""
        inputColor={State.defaultColor}
        buttonColor={State.defaultColor}
        buttonName="Next"
        onPress={(team1Name,team2Name)=>{
          navigation.navigate('Toss',{overs:overs,numPlayers:numPlayers,team1Name,team2Name});
        }}
      />

  )
}

TeamsScreen.navigationOptions = ({ navigation }) => {
  return {
    title: "Teams",
  }
};

const styles = StyleSheet.create({
});

export { TeamsScreen };