import React from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';

const defaultColor = '#f0245a';

const ThisOver = ({ data }) => {
  return <View style={styles.outerContainerStyle}>
    <View style={styles.textWrapperStyle}>
      <Text style={styles.textStyle}>
        This Over:
      </Text>
    </View>
    {Array.isArray(data)&&data.length ? <FlatList
      contentContainerStyle={{ justifyContent: 'center', alignItems: 'center' }}
      horizontal
      data={data}
      keyExtractor={(item) => `${item.id}`}
      renderItem={({ item }) => {
        return <View style={styles.textButtonStyle}>
          <Text style={{ fontSize: 10, color: defaultColor }}>
            {item.value}
          </Text>
        </View>
      }}
    /> : null}


  </View>
}

const styles = StyleSheet.create({
  outerContainerStyle: {
    flexDirection: 'row',
    borderColor: defaultColor,
    borderWidth: 2
  },
  textStyle: {
    fontSize: 12,
    fontWeight: '500',
    color: defaultColor,
    padding: 5
  },
  textWrapperStyle: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRightColor: defaultColor,
    borderRightWidth: 1,
    backgroundColor: '#515452'
  },
  textButtonStyle: {
    borderWidth: 1,
    borderColor: defaultColor,
    borderRadius: 100,
    height: 23,
    width: 23, 
    margin: 1,
    justifyContent:'center',
    alignItems:'center'
  }
});

export default ThisOver;