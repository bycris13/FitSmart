import { View, Text, TextInput, StyleSheet, Image, TouchableWithoutFeedback, Keyboard } from "react-native";
import React from "react";
import PressableButton from "../components/PressableButton";

export default function LoginScreen({ navigation }) {
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={styles.container}>
        <View style={styles.title}>
          <Text style={{ fontSize: 50 }}>FitSmart</Text>
          <Text style={{ fontSize: 20 }}>Bienvenido</Text>
        </View>

        <Image
          source={require("../assets/FitSmart-login.png")}
          style={styles.imgLogin}
        />

        <TextInput
          style={styles.input}
          placeholder="Correo electrónico"
          keyboardType="email-address"
        />

        <TextInput
          style={styles.input}
          placeholder="Contraseña"
          secureTextEntry
        />

        <PressableButton
          textStyle={styles.textLoginColor}
          style={styles.colorButton}
          label={"Ingresar"}
          onPress={() => console.log("hola")}
        />

        <View style={styles.acountText}>
          <Text>No tienes cuenta?</Text>
          <PressableButton
            textStyle={styles.textRegisterColor}
            label='Crea una cuenta.'
            onPress={() => navigation.navigate("Register")}
          />
        </View>   
      </View>
    </TouchableWithoutFeedback>
  );
}

// Los estyles se mantienen igual

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    paddingHorizontal: 30,
    paddingTop: 60, 
    backgroundColor: "#fff",
  },

  title: {
    alignSelf: "center",
    alignItems: "center",
    marginBottom: 20,
  },

  input: {
    height: 50,
    borderColor: "#ccc",
    borderWidth: 1,
    marginBottom: 15,
    borderRadius: 8,
    paddingHorizontal: 10,
  },

  colorButton: {
    backgroundColor: "#b4d5a6",
    alignItems: "center",
    borderRadius: 8,
    padding: "4%",
  },

  acountText: {
    display: "flex",
    flexDirection: "row",
    gap: "2%",
    marginVertical: 15,
    marginHorizontal: 10,
  },

  textRegisterColor: {
    color: "#0079fe",
  },

  textLoginColor: {
    color: "#fff",
    fontSize: 17,
    fontWeight: '500'
  },

  imgLogin: {
    alignSelf: "center",
    margin: 10,
    width: "50%",
    height: "22%",
  },
});