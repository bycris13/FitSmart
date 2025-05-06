import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import PressableButton from "../components/PressableButton";

export default function RegisterScreen({ navigation }) {
  const [termsAccepted, setTermsAccepted] = useState(false);

  return (
    // 1. KeyboardAvoidingView mueve el contenido arriba al aparecer el teclado
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      {/* 2. TouchableWithoutFeedback cierra el teclado al tocar fuera */}
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        {/* 3. ScrollView hace que todo pueda desplazarse si no cabe */}
        <ScrollView
          contentContainerStyle={styles.container}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.title}>
            <Text style={styles.titleText}>FitSmart</Text>
            <Text style={styles.subtitle}>Regístrate</Text>
          </View>

          <TextInput style={styles.input} placeholder="Nombre y Apellido" />
          <TextInput
            style={styles.input}
            placeholder="Celular"
            keyboardType="phone-pad"
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

          <TextInput
            style={styles.input}
            placeholder="Confirmar contraseña"
            secureTextEntry
          />

          <PressableButton
            style={styles.button}
            textStyle={styles.buttonText}
            label="Crear cuenta"
            onPress={() => {
              console.log("HOLA");
            }}
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
