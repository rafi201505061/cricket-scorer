import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import {
  HomeScreen, TeamsScreen, TossScreen,
  MainScreen, OpenersScreen, Team1PlayersScreen, Team2PlayersScreen,
  ScoreCardScreen,CreateMatchScreen
} from './src/screens';
import { Provider as ThemeProvider } from './src/Context/ThemeContext';
import { Provider as DataProvider } from './src/Context/DataContext';

const navigator = createSwitchNavigator({
  HomeFlow: createStackNavigator({
    Home:HomeScreen,
    CreateMatch:CreateMatchScreen,
    Team1Players: Team1PlayersScreen,
    Team2Players: Team2PlayersScreen,
    Openers: OpenersScreen,
    ScoreCardScreen:ScoreCardScreen
  }, {
    initialRouteName: 'Home',
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: '#f0245a',
        elevation:0,
        shadowOpacity:0
      },
      headerTintColor: '#36332b',
      headerTitleStyle: {
        fontWeight:'100',
        alignSelf: 'center'
      }
    }
  }),
  Main:MainScreen
});

const App = createAppContainer(navigator);

export default () => {
  return <ThemeProvider>
    <DataProvider>
      <App />
    </DataProvider>
  </ThemeProvider>
}