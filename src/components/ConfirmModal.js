import { View, Text, Modal, StyleSheet } from "react-native";
import React from "react";
import PressableButton from "./PressableButton";

export default function ConfirmModal({visible, message, onClose, onConfirm }) {
  return (
    <Modal animationType="fade" transparent={true} visible={visible}>
      <View style={styles.centerModal}>
        <View style={styles.modalContainer}>
          <View>
            <Text style={styles.textModal}>{message}</Text>
          </View>
          <View style={styles.alignButtons}>
            <PressableButton
              label={"Si"}
              onPress={onConfirm}
              style={[styles.buttonModal, { backgroundColor: "#9ec4f7" }]}
              textStyle={styles.textoBoton}
            />
            <PressableButton
              label={"No"}
              onPress={onClose}
              style={[styles.buttonModal, { backgroundColor: "#b4d5a6" }]}
              textStyle={styles.textoBoton}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
    centerModal:{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#00000080'
    },
    modalContainer: {
        width: '75%',
        backgroundColor: 'white',
        borderRadius: 8,
        padding: 25,
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
      },
      textModal:{
        textAlign: 'center',
        fontSize: 20,
        marginBottom: 10
      },
      alignButtons:{
        flexDirection: 'row',
        justifyContent: 'center',
        gap: '17%',
        marginTop: 30
      },

      buttonModal:{
        borderRadius: 8,
        padding: 12,
        width: '30%',
        justifyContent: 'center',
        shadowOffset:{
            width: 0,
            height: 2
        },
        shadowOpacity: 0.1,
        shadowRadius: 3
      },
      textoBoton: {
        color: "#fff",
        fontWeight: "bold",
        textAlign: 'center'
      },
});