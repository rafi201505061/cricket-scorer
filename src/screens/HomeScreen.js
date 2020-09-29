import React, { useState, useContext, useEffect } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, FlatList, SafeAreaView,Image } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import AsyncStorage from '@react-native-community/async-storage';
import Card from '../components/Card';
import { Context as DataContext } from '../Context/DataContext';

const HomeScreen = ({ navigation }) => {
  const [myMatches, setMyMatches] = useState([]);
  const { getMatch } = useContext(DataContext);
  const getMatches = async () => {
    const matches = await AsyncStorage.getItem('matches');
    //console.log(matches);
    if(matches)
    {
      const tempMatches = JSON.parse(matches);
      let matchesArray = [];
      tempMatches.forEach((item)=>{
        matchesArray.push(JSON.parse(item));
      })
      setMyMatches(matchesArray);
    }else{
      setMyMatches([]);
    }
  }
  const clearAppData = async function () {
    try {
      const keys = await AsyncStorage.getAllKeys();
      await AsyncStorage.multiRemove(keys);
      console.log('cleared');
    } catch (error) {
      console.error('Error clearing app data.');
    }
  }
  const deleteMatch = (id) => {
    var modifiedMyMatches = [];
    myMatches.forEach((item)=>{
      if(item.matchId!==id)
      modifiedMyMatches.push(item);
    })
    return modifiedMyMatches;
  }
  const setMatchesInStorage = async (id) => {
    try {
      AsyncStorage.clear();
      const matches = deleteMatch(id);
      let temp = [];
      matches.forEach((item)=>temp.push(JSON.stringify(item)));
      await AsyncStorage.setItem('matches', JSON.stringify(temp));
      setMyMatches(matches);
    } catch (error) {
      console.log('error');
    }
  }
  useEffect(() => {
    getMatches();
  }, []);

  return <SafeAreaView>
    <FlatList
      data={myMatches.sort((a,b)=>a.matchId<b.matchId)}
      keyExtractor={(item) => {
        return item.matchId;
      }}
      renderItem={({ item }) => {
        return <Card
          data={{
            team1Name: item.team1Name,
            team2Name: item.team2Name,
            time: item.time,
            date: item.date
          }}
          onPress={() => {
            getMatch(item);
            navigation.navigate('ScoreCardScreen');
          }
          }
          onDelete={()=>{
            setMatchesInStorage(item.matchId);
          }}
        />
      }}
    />
  </SafeAreaView>
}

HomeScreen.navigationOptions = ({ navigation }) => {
  return {
    title: "My Matches",
    headerRight: () => <TouchableOpacity onPress={() => navigation.navigate('CreateMatch')}>
      <View style={styles.headerButtonContainer}>
        <View >
          <Icon
            style={{ marginLeft: 5 }}
            name='edit'
            color='#36332b'
            size={18}
          />
        </View>
        <Text style={{ color: '#36332b', fontSize: 12, padding: 3, alignSelf: 'center' }}>new match</Text>
      </View>
    </TouchableOpacity>,
    headerLeft: () => <Image source={require('../../assets/logo1.png')} style={{height:50,width:50,margin:4}}/>
  }
};

const styles = StyleSheet.create({
  headerButtonContainer: {
    flexDirection: 'row',
    borderWidth: 2,
    borderColor: '#36332b',
    borderRadius: 50,
    marginRight: 10
  }
});

export { HomeScreen };