import { useState } from "react";
import { Alert } from "react-native";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/firebaseConfig";

export default function useRegister() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState();
  const [confirPassword, setConfirmPassword] = useState('');

  const createAcount = async () =>{
    // Valida que los campos no esten vacios.
    if (!name || !phone || !email || !password || !confirPassword ) {
      return Alert.alert('Asegurate de llenar todos');
    }
    // Valida que los campos contraseña y Confirmar contraseña sean iguales.
    if (password !== confirPassword) {
      return Alert.alert('Las contraseñas no coinciden');
    }
    // Conexion con firebase
    try {
        await createUserWithEmailAndPassword(auth, email, password); // Recive los datos que le entran a firebae email y pass.
        Alert.alert("Bienvenido", 'Cuenta creada exitosamente');
        return true;
    } catch (error) {
      Alert.alert("Error: ", error.password );
      return false
    }
  }

  return {
    // Hooks
    name, setName,
    phone, setPhone,
    email, setEmail,
    password, setPassword,
    confirPassword, setConfirmPassword,
    // Funciones
    createAcount
  };
}
