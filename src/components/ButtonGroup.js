import React from 'react';
import {StyleSheet,FlatList,View} from 'react-native';
import ButtonRow from './ButtonRow';

const defaultColor = '#f0245a';

const ButtonGroup = ({size,data}) => {
  return <View>
    <FlatList
      data={data}
      keyExtractor={(item)=>item[0].name+item[1].name}
      renderItem={({item})=>{
        return <ButtonRow 
          size={size}
          data={item}
          color={defaultColor}
        />
      }}
    />
  </View>
}

const styles = StyleSheet.create({

});

export default ButtonGroup;