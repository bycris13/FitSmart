import React from "react";
import { ScrollView, View, Text, Image, TextInput, StyleSheet, Alert, KeyboardAvoidingView, Platform } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import PressableButton from "../components/PressableButton";
import useProfileSetup from "../hooks/useProfileSetup";
import { useNavigation, useRoute } from "@react-navigation/native";

export default function ProfileSetupScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const esNuevo = route.params?.esNuevo; // Saber si viene del registro

 const  {
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
  guardarPerfil} = useProfileSetup(esNuevo, navigation);

  return (
    <KeyboardAvoidingView
      style={ {flex: 1} }
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.titulo}>FitSmart Perfil</Text>

      <Text style={styles.subtitulo}>
        Llene los siguientes campos de su perfil
      </Text>

      <Image
        source={require("../assets/Bienvenido.png")}
        style={styles.imagen}
        resizeMode="contain"
      />

      <Text style={styles.label}>Nombre y apellido:</Text>
      <TextInput
        style={styles.input}
        placeholder="nombre apellido"
        value={nombreApellido}
        onChangeText={setNombreApellido}
      />

      <Text style={styles.label}>Edad:</Text>
      <View style={styles.inputRow}>
        <TextInput
          style={[styles.input, styles.inputWithUnit]}
          placeholder="21"
          value={edad}
          onChangeText={setEdad}
          keyboardType="numeric"
        />
        <Text style={styles.unitText}>Años</Text>
      </View>

      <Text style={styles.label}>Género</Text>
      <DropDownPicker
        open={openGenero}
        value={genero}
        items={itemsGenero}
        setOpen={setOpenGenero}
        setValue={setGenero}
        setItems={setItemsGenero}
        placeholder="Seleccione su género"
        style={styles.dropdown}
        dropDownContainerStyle={styles.dropdownContainer}
        zIndex={3000}
        zIndexInverse={1000}
        listMode="SCROLLVIEW"
        scrollViewProps={{ nestedScrollEnabled: true }}
      />

      <Text style={styles.label}>Altura:</Text>
      <View style={styles.inputRow}>
        <TextInput
          style={[styles.input, styles.inputWithUnit]}
          placeholder="1.78"
          value={altura}
          onChangeText={setAltura}
          keyboardType="numeric"
        />
        <Text style={styles.unitText}>m</Text>
      </View>

      <Text style={styles.label}>Peso:</Text>
      <View style={styles.inputRow}>
        <TextInput
          style={[styles.input, styles.inputWithUnit]}
          placeholder="50"
          value={peso}
          onChangeText={setPeso}
          keyboardType="numeric"
          />
        <Text style={styles.unitText}>Kg</Text>
      </View>

      <Text style={styles.label}>Masa muscular:</Text>
      <View style={styles.inputRow}>
        <TextInput
          style={[styles.input, styles.inputWithUnit]}
          placeholder="25.9"
          value={masaMuscular}
          onChangeText={setMasaMuscular}
          keyboardType="numeric"
        />
        <Text style={styles.unitText}>IMC</Text>
      </View>

      <Text style={styles.label}>Nivel de experiencia</Text>
      <DropDownPicker
        open={openNivel}
        value={nivel}
        items={itemsNivel}
        setOpen={setOpenNivel}
        setValue={setNivel}
        setItems={setItemsNivel}
        placeholder="Seleccione su nivel"
        style={styles.dropdown}
        dropDownContainerStyle={styles.dropdownContainer}
        zIndex={2000}
        zIndexInverse={2000}
        listMode="SCROLLVIEW"
        scrollViewProps={{ nestedScrollEnabled: true }}
        />

      <View style={styles.buttonContainer}>
        <PressableButton
          label="Regresar"
          onPress={() => navigation.goBack()}
          style={[styles.botonBase, styles.botonRegresar]}
          textStyle={[styles.textoBoton, styles.textoBotonContinuar]}
        />
        <PressableButton
          label="Guardar"
          onPress={guardarPerfil}
          style={[styles.botonBase, styles.botonContinuar]}
          textStyle={[styles.textoBoton, styles.textoBotonContinuar]}
          />
      </View>
    </ScrollView>
</KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingBottom: 40,
    backgroundColor: "#ffffff",
  },
  titulo: {
    fontSize: 26,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 15,
    marginTop: "10%" 
  },
  subtitulo: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 10,
    color: "#555",
  },
  imagen: {
    width: "100%",
    height: 200,
  },
  label: {
    fontSize: 14,
    marginBottom: 5,
    marginTop: 12,
    color: "#333",
  },
  input: {
    height: 50,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 15,
    backgroundColor: "#fff",
    fontSize: 16,
  },
  inputRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  inputWithUnit: {
    flex: 1,
    marginRight: 10,
  },
  unitText: {
    fontSize: 14,
    color: "#555",
  },
  dropdown: {
    borderColor: "#ccc",
    borderRadius: 8,
    marginBottom: 5,
  },
  dropdownContainer: {
    borderColor: "#ccc",
    borderRadius: 8,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
    gap: 10,
  },
  botonBase: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  botonOmitir: {
    backgroundColor: "#D3EDC5",
  },
  botonContinuar: {
    backgroundColor: "#6699CC",
  },
  botonRegresar: {
    backgroundColor: "#b4d5a6",
  },
  textoBoton: {
    color: "#333",
    fontWeight: "bold",
    fontSize: 14,
  },
  textoBotonContinuar: {
    color: "#fff",
  },
});
