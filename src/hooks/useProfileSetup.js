import { useState } from "react";
import { Alert } from "react-native";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "../firebase/firebaseConfig";

export default function useProfileSetup(esNuevo, navigation) {
  // Campos de perfil
  const [nombreApellido, setNombreApellido] = useState("");
  const [edad, setEdad] = useState("");
  const [altura, setAltura] = useState("");
  const [peso, setPeso] = useState("");
  const [masaMuscular, setMasaMuscular] = useState("");

  // Género (DropDownPicker)
  const [openGenero, setOpenGenero] = useState(false);
  const [genero, setGenero] = useState(null);
  const [itemsGenero, setItemsGenero] = useState([
    { label: "Hombre", value: "hombre" },
    { label: "Mujer", value: "mujer" },
  ]);

  // Nivel de experiencia (DropDownPicker)
  const [openNivel, setOpenNivel] = useState(false);
  const [nivel, setNivel] = useState(null);
  const [itemsNivel, setItemsNivel] = useState([
    { label: "Bajo", value: "bajo" },
    { label: "Medio", value: "medio" },
    { label: "Alto", value: "alto" },
  ]);

  // Función para guardar en Firestore
  const guardarPerfil = async () => {
    try {
      const user = auth.currentUser;
      if (!user) {
        return Alert.alert("Error", "Usuario no autenticado.");
      }

      // Guardar (o fusionar) datos en la colección "usuarios" con ID = user.uid
      await setDoc(
        doc(db, "usuarios", user.uid),
        {
          nombreApellido,
          edad,
          genero,
          altura,
          peso,
          masaMuscular,
          nivel,
        },
        { merge: true }
      );

      Alert.alert("Éxito", "Perfil guardado correctamente");

      // Si viene del registro (esNuevo === true), reset a Login
      if (esNuevo) {
        navigation.reset({
          index: 0,
          routes: [{ name: "Login" }],
        });
      } else {
        // Si ya existía el perfil, simplemente vuelve atrás
        navigation.goBack();
      }
    } catch (error) {
      console.log("Error al guardar perfil:", error);
      Alert.alert("Error", "No se pudo guardar el perfil.");
    }
  };

  return {
    // Estados para cada campo
    nombreApellido,
    setNombreApellido,
    edad,
    setEdad,
    altura,
    setAltura,
    peso,
    setPeso,
    masaMuscular,
    setMasaMuscular,

    // Género
    openGenero,
    setOpenGenero,
    genero,
    setGenero,
    itemsGenero,
    setItemsGenero,

    // Nivel
    openNivel,
    setOpenNivel,
    nivel,
    setNivel,
    itemsNivel,
    setItemsNivel,

    // Función para guardar
    guardarPerfil,
  };
}
