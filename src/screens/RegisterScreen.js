import React, { useState } from "react";
import { View, Text,TextInput, StyleSheet, KeyboardAvoidingView, Platform, ScrollView,TouchableWithoutFeedback, Keyboard } from "react-native";
import PressableButton from "../components/PressableButton";
import useRegister from "../hooks/useRegister";

export default function RegisterScreen({ navigation }) {
  // Hooks y funciones
  const {name, phone, email, password, confirPassword, setName, setEmail, setPhone, setPassword, setConfirmPassword, createAcount} = useRegister();
  // Funcion que navega a la pantalla del login una vez creada la cuenta
  const onPressCreateAcount = async () =>{
    const succes = await createAcount();
    if(succes){
      navigation.navigate('SelectBodyPart');
    }
  }

  return (
    // KeyboardAvoidingView mueve el contenido arriba al aparecer el teclado.
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      {/* TouchableWithoutFeedback cierra el teclado al tocar fuera */}
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        {/* ScrollView hace que todo pueda desplazarse si no cabe */}
        <ScrollView
          contentContainerStyle={styles.container}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.title}>
            <Text style={styles.titleText}>FitSmart</Text>
            <Text style={styles.subtitle}>Regístrate</Text>
          </View>

          <TextInput 
          style={styles.input}
          placeholder="Nombre y Apellido" 
          autoCapitalize="words"
          value={name}
          onChangeText={(text) => setName(text)}
          />

          <TextInput
            style={styles.input}
            placeholder="Celular"
            keyboardType="phone-pad"
            value={phone}
            onChangeText={(text) => setPhone(text)}
          />

          <TextInput
            style={styles.input}
            placeholder="Correo electrónico"
            keyboardType="email-address"
            value={email}
            onChangeText={(text) => setEmail(text)}
          />

          <TextInput
            style={styles.input}
            placeholder="Contraseña"
            secureTextEntry
            value={password}
            onChangeText={(text) => setPassword(text)}
          />

          <TextInput
            style={styles.input}
            placeholder="Confirmar contraseña"
            secureTextEntry
            value={confirPassword}
            onChangeText={(text) => setConfirmPassword(text)}
          />

          <PressableButton
            style={styles.button}
            textStyle={styles.buttonText}
            label="Crear cuenta"
            onPress={() => onPressCreateAcount()}
          />

          <View style={styles.loginLinkContainer}>
            <Text>¿Ya tienes cuenta?</Text>
            <PressableButton
              textStyle={styles.loginLink}
              label="Inicia sesión"
              onPress={() => navigation.navigate("Login")}
            />
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 30,
    backgroundColor: "#fff",
    flexGrow: 1,
    justifyContent: "center",
  },

  title: {
    alignItems: "center",
    marginBottom: 20,
  },

  titleText: {
    fontSize: 50,
  },

  subtitle: {
    fontSize: 18,
    color: "#666",
  },

  input: {
    height: 50,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 15,
  },

  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },

  button: {
    backgroundColor: "#b4d5a6",
    alignItems: "center",
    borderRadius: 8,
    padding: 15,
  },

  buttonText: {
    color: "#fff",
    fontSize: 17,
    fontWeight: '500'
  },

  loginLinkContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 20,
    gap: 5,
  },

  loginLink: {
    color: "#0079fe",
  },
});
