import React from 'react';
import Icon from 'react-native-vector-icons/AntDesign';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

const defaultColor = '#f0245a';

const SlideList = ({ onSelect, value,data }) => {
  //onSelecet(isClicked,selected)->sets the state
  //value:{selected:,isClicked}
 //console.log(value);
  
  const renderList = () => <View style={{ width: 220 }}>
    <ScrollView >
      {
        data.map((item) => <TouchableOpacity key={`${item}${Math.random()*99999}`} onPress={() => onSelect(false, item)}>
          <View style={{...styles.listStyle,backgroundColor:item === value.selected?'#f0245a':'#f5f4f2'}}>
            <Text style={{...styles.textStyle,color:value.selected===item?'white':defaultColor}}>
              {item}
            </Text>
          </View>
        </TouchableOpacity>)
      }
    </ScrollView>
  </View>
  

  return <View style={{ width: 220 }}>
    <TouchableOpacity onPress={() => onSelect(!value.isClicked, value.selected)}>
      <View style={styles.containerStyle}>
        <Text style={styles.textStyle}>
          {value.selected}
        </Text>
        <Icon
          style={{ margin: 1, alignSelf: 'center', padding: 2 }}
          name='downcircleo'
          size={20}
          color={defaultColor}
        />
      </View>
    </TouchableOpacity>
    {value.isClicked ? renderList() : null}
  </View>
}

const styles = StyleSheet.create({
  containerStyle: {
    flexDirection: 'row',
    backgroundColor: '#f5f4f2',
    justifyContent: 'space-between',
    borderRadius: 2,
    borderWidth: 2,
    borderColor: defaultColor,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    width: 220
  },
  listStyle: {
    borderLeftWidth: 2,
    borderRightWidth: 2,
    borderBottomWidth: 2,
    borderColor: defaultColor,
    width: 220,
    padding: 5,
    backgroundColor: '#f5f4f2'
  },
  textStyle: {
    alignSelf: 'center',
    color: defaultColor,
    fontSize: 16,
    fontWeight: '400',
    padding: 2
  },
  contentContainerStyle: {

  }
});

export default SlideList;