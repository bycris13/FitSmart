import { View, Text, TextInput, StyleSheet, Image, TouchableWithoutFeedback, Keyboard, Alert } from "react-native";
import React, { useState } from "react";
import PressableButton from "../components/PressableButton";
import { auth } from '../firebase/firebaseConfig';
import { signInWithEmailAndPassword } from 'firebase/auth';
import useLogin from "../hooks/useLogin";

export default function LoginScreen({ navigation }) {

  const {email, password, setEmail, setPassword} = useLogin();

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

        <PressableButton
          textStyle={styles.textLoginColor}
          style={styles.colorButton}
          label={"Ingresar"}
          onPress={async() =>{
            try{
              await signInWithEmailAndPassword(auth, email, password); // extrae la auteticacion de firebase email y password
              /* Alert.alert("Conexion Exitosa"); */
              // Esta línea impide volver al login después de iniciar sesión correctamente
              navigation.reset({
                index: 0,
                routes:[{name: 'Home'}]
              })
            }catch (error) {
              Alert.alert("Error:", 'Correo o Contraseña son incorrectos');
            }
          }}
        />

        <View style={styles.acountText}>
          <Text>No tienes cuenta?</Text>
          <PressableButton
            textStyle={styles.textLinkColor}
            label='Crea una cuenta.'
            onPress={() => navigation.navigate('Register')}
          />
        </View>
        <View>
          <PressableButton 
          textStyle={[styles.textLinkColor, styles.textRecoverPwd]}
          label={'¿No recuerdas tu contraseña?'}
          onPress={() => navigation.navigate('RestorePassword')}
          />
        </View>   
      </View>
    </TouchableWithoutFeedback>
  );
}

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

  textLinkColor: {
    color: "#0079fe",
  },

  textLoginColor: {
    color: "#fff",
    fontSize: 17,
    fontWeight: '500'
  },

  textRecoverPwd:{
    alignSelf: 'center',
    marginVertical: '3%'
  },

  imgLogin: {
    alignSelf: "center",
    margin: 10,
    width: "50%",
    height: "22%",
  },
});