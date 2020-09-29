import React, { useReducer, useContext } from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import { Context as DataContext } from '../Context/DataContext';
import TextInput from '../components/TextInput';
import Button from '../components/Button';

const defaultColor = '#f0245a';
const reducer = (state, action) => {
  switch (action.type) {
    case 'set_textinput_value':
      const temp = state.filter((item) => item.name != action.payload.name);
      let errorMessage = '';
      if (!(/([a-zA-Z ]){2,30}/.test(action.payload.value))) {
        errorMessage = 'Name must contain only letters and whitespaces and length must be between 2 and 30.'
      }
      const modifiedState = [...temp, { ...action.payload, errorMessage }];
      const sortedState = modifiedState.sort((a, b) => a.id > b.id);
      return sortedState;
    default:
      return state;
  }
}

const Team1PlayersScreen = ({ navigation }) => {
  const { State, setTeamPlayers } = useContext(DataContext);
  const playersPerSide = parseInt(State.playersPerSide);
  let initialState = [];
  let i;
  for (i = 1; i <= playersPerSide; i++) {
    initialState.push({ name: `player${i}`, value: `R${String.fromCharCode(65 + i)}`, errorMessage: '',id:i })
  }
  const [teamPlayers, dispatch] = useReducer(reducer, [
    ...initialState
  ])
  const setTextInputValue = (item) => {
    dispatch({ type: 'set_textinput_value', payload: item });
  }
  let inputValidation = true;
  var namesSet = new Set();
  for (i = 0; i < playersPerSide; i++) {
    inputValidation = inputValidation && (/([a-zA-Z ]){2,30}/.test(teamPlayers[i].value));
    namesSet.add(teamPlayers[i].value);
  }

  return <View style={{flex:1}}>
    <View style={{flex:.5}}>
      <Text style={{ color: defaultColor, fontSize: 12, alignSelf: 'center' }}>
        ** All names must be unique **
    </Text>
    </View>
    <View style={{flex:8.5}}>
      <FlatList
        data={teamPlayers}
        keyExtractor={(item) => item.name}
        renderItem={({ item }) => <TextInput
          label={item.name}
          placeholder=''
          errorMessage={item.errorMessage}
          color='#f0245a'
          containerStyle={styles.inputContainerStyle}
          value={item.value}
          onChangeText={(newVal) => setTextInputValue({ ...item, value: newVal })}
        />
        }
      />
    </View>
    <View style={{flex:1}}>
      <Button
        disabled={!(inputValidation && namesSet.size === State.playersPerSide)}
        name='Next'
        color='#f0245a'
        onPress={() => {
          setTeamPlayers(teamPlayers, 'team1');
          navigation.navigate('Team2Players', { team2Name: navigation.getParam('team2Name') });
        }}
      />
    </View>

  </View>
}

Team1PlayersScreen.navigationOptions = ({ navigation }) => {
  return {
    title: `${navigation.getParam('team1Name')} Players`
  }
};

const styles = StyleSheet.create({
  inputContainerStyle: {
    marginBottom: 5
  }
});

export { Team1PlayersScreen };
