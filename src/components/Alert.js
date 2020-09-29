import React, { useState } from 'react';
import { StyleSheet, Modal, View, Text, TouchableOpacity } from 'react-native';

const Alert = ({ isVisible, header, nfAction, pfAction }) => {
  return <Modal
    animationType="slide"
    transparent={true}
    visible={isVisible}
    onRequestClose={() => {
    }}
  >
    <View style={styles.centeredView}>
      <View style={styles.modalView}>
        <Text style={styles.modalText}>{header}</Text>
        <View style={{flexDirection:'row'}}>
          <View style={{flex:1}}></View>
          <View style={{flex:.7,justifyContent:"space-around",flexDirection:'row'}}>
            <TouchableOpacity
              style={{ ...styles.openButton, backgroundColor: '#f0245a' }}
              onPress={nfAction}
            >
              <Text style={styles.textStyle}>No</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{ ...styles.openButton, backgroundColor: '#f0245a' }}
              onPress={pfAction}
            >
              <Text style={styles.textStyle}>Yes</Text>
            </TouchableOpacity>
          </View>
        </View>
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

export default Alert;