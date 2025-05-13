import { View, Text, TextInput , StyleSheet, TouchableNativeFeedback, Keyboard, Alert } from 'react-native'
import React, { useState } from 'react'
import PressableButton from '../components/PressableButton';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../firebase/firebaseConfig';

export default function RestorePassword({ navigation }) {

  const [email,  setEmail] = useState('');

  return (
    <TouchableNativeFeedback onPress={Keyboard.dismiss} accessible={false}> 
    <View style={styles.container}>
      <View>
      <Text style={styles.textHuge}>Recupera tu contraseña</Text>
      <Text style={{marginTop: 20}}>Ingresa el correo electrónico asociado a tu cuenta. Te enviaremos un enlace para crear una nueva contraseña.</Text>
      </View>

      <TextInput
      style={styles.input}
      placeholder='Correo electronico'
      keyboardType='email-address'
      value={email}
      onChangeText={(text) => setEmail(text)}
      />

      <PressableButton
      textStyle={styles.colorButton}
      label={'Enviar'}
      onPress={async () =>{
        if(!email){
            return Alert.alert('Ingrese un correo valido');
        }

        try {
            await sendPasswordResetEmail(auth, email);
            Alert.alert('Correo enviado', 'Revisa tu bandeja de entrada');
            navigation.navigate('Login');
        } catch (error) {
            Alert.alert('Erro:', error.message);
        }      
      }}
      />
    </View>
    </TouchableNativeFeedback>
  )
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        justifyContent: "flex-start",
        paddingHorizontal: 30,
        paddingTop: '20%', 
        backgroundColor: "#fff",
    },

    textHuge:{
      fontSize: 25
    },

    input:{
        height: 50,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 8,
        marginTop: 20,
        paddingHorizontal: 10
    },

    colorButton:{
        backgroundColor: '#b4d5a6',
        textAlign: 'center',
        marginVertical: 20,
        borderRadius: 8,
        padding: '4%'
    }

});