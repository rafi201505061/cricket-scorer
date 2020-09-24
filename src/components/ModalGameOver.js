import React from 'react';
import { StyleSheet, Text, View, TouchableHighlight, Modal } from 'react-native';

const defaultColor = '#f0245a';

const ModalGameOver = ({ modalText, isVisible, onSubmit}) => {
  /*
  modalText: header of modal(String)
  isVisible: modal visibility(boolean)
  onSubmit: submit button click handler.params:none(function)
  slideListValue: SlideList Value property {object{isClicked:boolean,selected:string}}
  onSelect: SlideList onSelect functionCall
  */
  return <Modal
    animationType="slide"
    transparent={true}
    visible={isVisible}
    onRequestClose={() => {
    }}
  >
    <View style={styles.centeredView}>
      <View style={styles.modalView}>
        <Text style={styles.modalText}>{modalText}</Text>
        <TouchableHighlight
          style={{ ...styles.openButton, backgroundColor: '#f0245a' }}
          onPress={()=>onSubmit()}
        >
          <Text style={styles.textStyle}>submit</Text>
        </TouchableHighlight>
      </View>
    </View>
  </Modal>
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
    backgroundColor: 'black',
    opacity: .8
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
    elevation: 2
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    color: '#f0245a',
    marginBottom: 15,
    textAlign: "center"
  }
});

export default ModalGameOver;