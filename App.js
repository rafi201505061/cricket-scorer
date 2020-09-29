import React from 'react';
import {Dimensions} from 'react-native'
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createDrawerNavigator } from 'react-navigation-drawer';
import { createStackNavigator } from 'react-navigation-stack';
import Icon from 'react-native-vector-icons/AntDesign';
import {
  HomeScreen, LineChartScreen,
  MainScreen, OpenersScreen, Team1PlayersScreen, Team2PlayersScreen,
  ScoreCardScreen, CreateMatchScreen, BarChartScreen
} from './src/screens';
import { Provider as ThemeProvider } from './src/Context/ThemeContext';
import { Provider as DataProvider } from './src/Context/DataContext';

const navigator = createSwitchNavigator({
  HomeFlow: createStackNavigator({
    Home: HomeScreen,
    CreateMatch: CreateMatchScreen,
    Team1Players: Team1PlayersScreen,
    Team2Players: Team2PlayersScreen,
    Openers: OpenersScreen,
    ScoreCard: createDrawerNavigator({
      ScoreCardScreen: {
        screen: ScoreCardScreen,
        navigationOptions: {
          title: 'Score Card',
          drawerIcon: ()=><Icon
            name='contacts'
            size={24}
          />
        }
      },
      BarChartScreen: {
        screen: BarChartScreen,
        navigationOptions: {
          title: 'Runs by Over',
          drawerIcon: ()=><Icon
            name='barschart'
            size={24}
          />
        }
      },
      LineChartScreen: {
        screen: LineChartScreen,
        navigationOptions: {
          title: 'Runs Comparison',
          drawerIcon: ()=><Icon
            name='linechart'
            size={24}
          />
        }
      }
    }, {
      navigationOptions: {
        headerShown: false
      },
      drawerWidth: Dimensions.get("window").width*.85,
      hideStatusBar:true,
      contentOptions:{
        activeBackgroundColor:'#f2d8df',
        activeTintColor: '#f0245a',
        itemsContainerStyle:{
          marginTop:16,
          marginHorizontal:8
        },
        itemStyle:{
          borderRadius:4
        }
      }
    })
  }, {
    initialRouteName: 'Home',
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: '#f0245a',
        elevation: 0,
        shadowOpacity: 0
      },
      headerTintColor: '#36332b',
      headerTitleStyle: {
        fontWeight: '100',
        alignSelf: 'center'
      }
    }
  }),
  Main: MainScreen
});

const App = createAppContainer(navigator);

export default () => {
  return <ThemeProvider>
    <DataProvider>
      <App />
    </DataProvider>
  </ThemeProvider>
}