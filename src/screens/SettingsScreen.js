import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Modal, Alert } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { auth, db } from "../firebase/firebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import { signOut, deleteUser } from "firebase/auth";
import { useNavigation } from "@react-navigation/native";
import PressableButton from "../components/PressableButton";
import BottomNavigationBar from "../components/BottomNavigationBar";
import ConfirmModal from "../components/ConfirmModal";

export default function SettingsScreen() {
  const navigation = useNavigation();
  const [telefono, setTelefono] = useState(""); // Se trae de firestore database
  const [nombre, setNombre] = useState(""); 
  const [modalExit, setModalExit] = useState(false);
  const [modalDelete, setModalDelete] = useState(false);

  // Devuelve el usuario logeado  
  const user = auth.currentUser;

  const handleCerrarSesion = async () => {
    // Se cierra la sesion del usuario que estelogeado y regresa al Login.
    await signOut(auth);
    navigation.reset({
      index: 0,
      routes: [{ name: "Login" }],
    });
    Alert.alert('Sesión Cerrada','Salio exitosamente!')
  };

  const handleEliminarCuenta = async () => {
    try {
      // Elimina el usuario que estelogeado y regresa al Login.
      await deleteUser(user);
      navigation.reset({
        index: 0,
        routes: [{ name: "Login" }],
      });
      Alert.alert('Eliminda!', `Se elimino correctamente ${user.email}`);
    } catch (error) {
      console.error("Error al eliminar cuenta:", error);
    }
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const user = auth.currentUser;
        const docRef = doc(db, "usuarios", user.uid);
        const docSnap = await getDoc(docRef);
  
        if (docSnap.exists()) {
          const data = docSnap.data();
          setNombre(data.nombre || "Sin nombre");
          setTelefono(data.telefono || "Sin número");
        } else {
          console.log("No se encontró el documento del usuario");
        }
      } catch (error) {
        console.log("Error al obtener datos del usuario:", error);
      }
    };
  
    fetchUserData();
  }, []);
  
  

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Ajustes</Text>

      <Text style={styles.seccion}>Usuario</Text>

      <View style={[styles.inputBox, { backgroundColor: "#b4d5a6" }]}>
        <Ionicons name="person" size={20} color="#fff" />
        <Text style={styles.texto}>{nombre}</Text>
      </View>

      <View style={[styles.inputBox, { backgroundColor: "#9fc5f8" }]}>
        <Ionicons name="mail" size={20} color="#fff" />
        <Text style={styles.texto}>{user?.email}</Text>
      </View>

      <View style={[styles.inputBox, { backgroundColor: "#ffe599" }]}>
        <Ionicons name="call" size={20} color="#fff" />
        <Text style={styles.texto}>{telefono}</Text>
      </View>

      <Text style={styles.seccion}>Sesión</Text>
      {/* Modal Personalizado para salir de la cuenta */}
      <ConfirmModal
       visible={modalExit}
       message={'¿Estas seguro que deseas salir de la cuenta?'}
       onClose={() => setModalExit(!modalExit)}
       onConfirm={handleCerrarSesion}/>
      {/* Botones con opacidad personalizados */}
      <PressableButton
        label="Cerrar sesión"
        onPress={() => setModalExit(!modalExit)}
        style={[styles.button, { backgroundColor: "#4facfe" }]}
        textStyle={styles.textButton}
      />
      {/* Modal Personalizado para eliminar la cuenta */}
      <ConfirmModal
       visible={modalDelete}
       message={'¿Estas seguro que deseas eliminar la cuenta?'}
       onClose={() => setModalDelete(!modalDelete)}
       onConfirm={handleEliminarCuenta}/>
      <PressableButton
        label="Eliminar cuenta"
        onPress={() => setModalDelete(!modalDelete)}
        style={[styles.button, { backgroundColor: "#ff6b6b" }]}
        textStyle={styles.textButton}
      />
      <BottomNavigationBar/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
    paddingTop: 50,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  seccion: {
    fontSize: 16,
    fontWeight: "bold",
    marginVertical: 10,
    color: "#333",
  },
  inputBox: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    borderRadius: 8,
    marginBottom: 10,
    justifyContent: "space-between",
  },
  texto: {
    color: "#fff",
    fontSize: 17,
    flex: 1,
    marginLeft: 10,
  },
  button: {
    padding: '4%',
    borderRadius: 8,
    marginBottom: 10,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  textButton: {
    color: "#fff",
    fontWeight: "bold",
    textAlign: 'center'
  },
});
