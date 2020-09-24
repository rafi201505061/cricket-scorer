import React from 'react';
import { StyleSheet, FlatList, View,Text } from 'react-native';
import RoundButton from './RoundButton';

const defaultColor = '#f0245a';

const ButtonRow = ({data,color,size,calledBy}) => {
  return <View style={styles.containerStyle}>
    <FlatList
      contentContainerStyle={{flex:1,justifyContent:'space-around'}}
      horizontal
      ListEmptyComponent={()=>{
        return <Text style={{color:color,fontSize:18}}>
          No item to show
        </Text>
      }}
      data={data}
      keyExtractor={(item) => item.name}
      renderItem={({ item }) => {
        return <View style={styles.innerViewStyle}>
          <RoundButton name={item.name}
            size={size}
            color={color}
            onPress={item.callback}
            calledBy={calledBy}
          />
        </View>
      }}
    />
  </View>
}

const styles = StyleSheet.create({
  containerStyle: {
    flexDirection:'row',
    justifyContent: 'space-around',
    margin:7
  },
  innerViewStyle:{
  }
});

export default ButtonRow;