import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Modal } from 'react-native';
import SlideList from './SlideList';

const defaultColor = '#f0245a';
const ModalInningsChange = ({ modalText, disabled, isVisible, onSubmit, slideListValues, onSelectOpeningBowler, onSelectNonStriker, onSelectStriker, data }) => {
  return <Modal
    animationType="slide"
    transparent={true}
    visible={isVisible}
    onRequestClose={() => {
    }}
  >
    <View style={styles.centeredView}>
      <Text style={styles.modalText}>{modalText}</Text>
      <View style={styles.modalView}>
        <Text style={{ ...styles.modalText, fontSize: 12 }}>
          ** striker and non striker must be different **
      </Text>
        <View style={{ flexDirection: 'row' }}>
          <View style={{ flex: 1, alignSelf: 'center' }}>
            <Text style={styles.modalText}>striker : </Text>
          </View>
          <View style={{ flex: 4 }}>
            <SlideList
              data={data.batsmen}
              value={slideListValues.striker}
              onSelect={(isClicked, selected) => {
                onSelectStriker(isClicked, selected);
              }}
            />
          </View>
        </View>
        <View style={{ flexDirection: 'row' }}>
          <View style={{ flex: 1, alignSelf: 'center' }}>
            <Text style={styles.modalText}>non striker : </Text>
          </View>
          <View style={{ flex: 4 }}>
            <SlideList
              data={data.batsmen}
              value={slideListValues.nonStriker}
              onSelect={(isClicked, selected) => {
                onSelectNonStriker(isClicked, selected);
              }}
            />
          </View>
        </View>
        <View style={{ flexDirection: 'row' }}>
          <View style={{ flex: 1, alignSelf: 'center' }}>
            <Text style={styles.modalText}>opening bowler : </Text>
          </View>
          <View style={{ flex: 4 }}>
            <SlideList
              data={data.bowlers}
              value={slideListValues.openingBowler}
              onSelect={(isClicked, selected) => { onSelectOpeningBowler(isClicked, selected) }}
            />
          </View>
        </View>
        <TouchableOpacity
          disabled={disabled}
          style={{ ...styles.openButton}}
          onPress={() => onSubmit()}
        >
          <Text style={styles.textStyle}>submit</Text>
        </TouchableOpacity>
      </View>
    </View>
  </Modal>
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: 'black',
    opacity: 1
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  },
  openButton: {
    marginTop: 8,
    borderRadius: 10,
    padding: 5,
    borderWidth:2,
    borderColor:'#f0245a'
  },
  textStyle: {
    color: "#f0245a",
    fontWeight: "bold"
  },
  modalText: {
    color: '#f0245a',
    marginBottom: 15,
    textAlign: "center"
  }
});

export default ModalInningsChange;