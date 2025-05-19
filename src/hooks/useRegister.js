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
      
      let message = 'Ocurrio un error. Inteta nuevamente.';
      // Para saber que tipo de error es.
      if(error.code === 'auth/email-already-in-use'){
        message = 'El correo ya esta regitrado.';
      }else if (error.code === 'auth/invalid-email') {
        message = 'El correo no es valido.';
      }else if (error.code === 'auth/weak-password') {
        message = 'La contraseña es muy debil (mínimo 6 caracteres).';
      }

      Alert.alert("Error", message);
      return false;
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
