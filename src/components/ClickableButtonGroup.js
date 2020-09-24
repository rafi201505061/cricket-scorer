import React, { useState } from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import RoundButton from './RoundButton';

const defaultColor = '#f0245a';

const ClickableButtonGroup = ({ initialState,onPress }) => {
  return <View style={{ flexDirection: 'row', justifyContent: "space-between", marginRight: 50, marginTop: 2 }}>
    {initialState.map((item) => <RoundButton key={item.name}

      color={item.isClicked ? '#ffffff' : defaultColor}
      name={item.name}
      size={40}
      backGroundColor={item.isClicked ? defaultColor : '#ffffff'}
      onPress={(type,payload)=> onPress(type,payload)}
    />
    )
    }
  </View>
}


const styles = StyleSheet.create({
  contentContainerStyle: {
    flex: 1,
    justifyContent: 'space-around',
    margin: 2
  }
});

export default ClickableButtonGroup;