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
    matches ? setMyMatches(JSON.parse(matches)) : setMyMatches([]);
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
  useEffect(() => {
    getMatches();
  }, []);

  return <SafeAreaView>
    <FlatList
      data={myMatches}
      keyExtractor={(item) => {
        const titem = JSON.parse(item);
        return titem.matchId;
      }}
      renderItem={({ item }) => {
        const titem = JSON.parse(item);
        return <Card
          data={{
            team1Name: titem.team1Name,
            team2Name: titem.team2Name,
            time: titem.time,
            date: titem.date
          }}
          onPress={() => {
            getMatch(titem);
            navigation.navigate('ScoreCardScreen');
          }
          }
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