import React, { useReducer, useContext, useEffect } from 'react';
import {
  StyleSheet, Text, View, KeyboardAvoidingView,
  TouchableWithoutFeedback, Platform, Keyboard, Image
} from 'react-native';
import TextInput from '../components/TextInput';
import Button from '../components/Button';
import SlideList from '../components/SlideList';
import { Context as DataContext } from '../Context/DataContext';

const reducer = (state, action) => {
  switch (action.type) {
    case 'players_a_side':
      {
        let errorMessage = '';
        if (!(/^\d+$/.test(action.payload)
          && parseInt(action.payload) >= 5
          && parseInt(action.payload) <= 11)) {
          errorMessage = 'must be a number between 5 and 11 ';
        }
        return { ...state, players_a_side: { value: action.payload, errorMessage } };
      }

    case 'overs':
      {
        let errorMessage = '';
        if (!(/^\d+$/.test(action.payload))) {
          errorMessage = 'must be a number > 0';
        } else {
          if (parseInt(action.payload) === 0) {
            errorMessage = 'must be a number > 0';
          }
        }
        return { ...state, overs: { value: action.payload, errorMessage } };
      }
    case 'team1Name':
      {
        let errorMessage = '';
        if (!(/^[\w -]{2,30}$/.test(action.payload))) {
          errorMessage = 'Team name must only contain characters,digits,-,whitespace,_ and length must be between 2 and 30';
        }
        return { ...state, team1Name: { value: action.payload, errorMessage } };
      }
    case 'team2Name':
      {
        let errorMessage = '';
        if (!(/^[\w- ]{2,30}$/.test(action.payload))) {
          errorMessage = 'Team name must only contain characters,digits,-,whitespace,_ and length must be between 2 and 30';
        }
        return { ...state, team2Name: { value: action.payload, errorMessage } };
      }
    case 'tossWonBy':
      return { ...state, tossWonBy: { ...action.payload } };
    case 'battingTeam':
      return { ...state, battingTeam: { ...action.payload } };
    default:
      return state;
  }
}

const CreateMatchScreen = ({ navigation }) => {
  const { State, setTeamInfo, initializeState } = useContext(DataContext);
  const [teamInfo, dispatch] = useReducer(reducer, {
    players_a_side: { value: '', errorMessage: '' },
    overs: { value: '', errorMessage: '' },
    team1Name: { value: '', errorMessage: '' },
    team2Name: { value: '', errorMessage: '' },
    tossWonBy: { selected: '', isClicked: false },
    battingTeam: { selected: '', isClicked: false }
  })
  useEffect(() => {
    initializeState();
  }, []);
  const team1NameValidation = /^[\w- ]{2,30}$/.test(teamInfo.team1Name.value);
  const team2NameValidation = /^[\w- ]{2,30}$/.test(teamInfo.team2Name.value);
  const oversValidation = /^[0-9]+$/.test(teamInfo.overs.value);
  const playersPerSideValidation = (/^\d+$/.test(teamInfo.players_a_side.value)
    && parseInt(teamInfo.players_a_side.value) >= 5
    && parseInt(teamInfo.players_a_side.value) <= 11);
  const tossWonByValidation = teamInfo.tossWonBy.selected !== '';
  const battingTeamValidation = teamInfo.battingTeam.selected !== '';
  const teamInfoValidaton = team1NameValidation && team2NameValidation && oversValidation
    && playersPerSideValidation && tossWonByValidation && battingTeamValidation;
  return <KeyboardAvoidingView behavior={Platform.OS == "ios" ? "padding" : "height"}
    style={styles.containerStyle}>
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View>
        <TextInput
          label='Players per side'
          placeholder=''
          errorMessage={teamInfo.players_a_side.errorMessage}
          color='#f0245a'
          containerStyle={styles.inputContainerStyle}
          value={teamInfo.players_a_side.value}
          onChangeText={(newVal) => dispatch({ type: 'players_a_side', payload: newVal })}
        />
        <TextInput
          label='Overs'
          placeholder=''
          errorMessage={teamInfo.overs.errorMessage}
          color='#f0245a'
          containerStyle={styles.inputContainerStyle}
          value={teamInfo.overs.value}
          onChangeText={(newVal) => dispatch({ type: 'overs', payload: newVal })}
        />
        <TextInput
          autoCorrent={false}
          autoCapitalize={false}
          label='Team 1 Name'
          placeholder=''
          errorMessage={teamInfo.team1Name.errorMessage}
          color='#f0245a'
          containerStyle={styles.inputContainerStyle}
          value={teamInfo.team1Name.value}
          onChangeText={(newVal) => dispatch({ type: 'team1Name', payload: newVal })}
        />
        <TextInput
          label='Team 2 Name'
          placeholder=''
          errorMessage={teamInfo.team2Name.errorMessage}
          color='#f0245a'
          containerStyle={styles.inputContainerStyle}
          value={teamInfo.team2Name.value}
          onChangeText={(newVal) => dispatch({ type: 'team2Name', payload: newVal })}
        />
        <View style={{ flexDirection: 'row', margin: 3 }}>
          <View style={{ flex: 2 }}>
            <Text style={{ color: '#f0245a', alignSelf: 'center' }}>Toss Won By </Text>
          </View>
          <View style={{ flex: 4 }}>
            <SlideList
              data={[teamInfo.team1Name.value, teamInfo.team2Name.value]}
              value={teamInfo.tossWonBy}
              onSelect={(isClicked, selected) => dispatch({
                type: 'tossWonBy',
                payload: { isClicked, selected }
              })}
            />
          </View>

        </View>
        <View style={{ flexDirection: 'row', margin: 3 }}>
          <View style={{ flex: 2 }}>
            <Text style={{ color: '#f0245a', alignSelf: 'center' }}>Batting Team </Text>
          </View>
          <View style={{ flex: 4 }}>
            <SlideList
              data={[teamInfo.team1Name.value, teamInfo.team2Name.value]}
              value={teamInfo.battingTeam}
              onSelect={(isClicked, selected) => dispatch({
                type: 'battingTeam',
                payload: { isClicked, selected }
              })}
            />
          </View>
        </View>
        <Button
          disabled={!teamInfoValidaton}
          name='Next'
          color='#f0245a'
          onPress={() => {
            setTeamInfo(teamInfo);
            navigation.navigate('Team1Players', {
              team1Name: teamInfo.team1Name.value,
              team2Name: teamInfo.team2Name.value
            });
          }}
        />
      </View>

    </TouchableWithoutFeedback>
  </KeyboardAvoidingView>
}

CreateMatchScreen.navigationOptions = ({ navigation }) => {
  return {
    headerTitle: () => <Image source={require('../../assets/logo1.png')} style={{ height: 50, width: 50, margin: 4, marginLeft: 90 }} />
  }
};

const styles = StyleSheet.create({
  inputContainerStyle: {
    marginBottom: 5
  },
  containerStyle: {
    flex: 1
  }
});

export { CreateMatchScreen };

