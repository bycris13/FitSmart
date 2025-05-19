import React, { useState } from "react";
import {
  ScrollView,
  View,
  Text,
  Image,
  TextInput,
  StyleSheet
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import PressableButton from "../components/PressableButton";


export default function ProfileSetupScreen({ navigation }) {
  const [nombreApellido, setNombreApellido] = useState('');
  const [edad, setEdad] = useState('');
  const [genero, setGenero] = useState('');
  const [altura, setAltura] = useState('');
  const [peso, setPeso] = useState('');
  const [masaMuscular, setMasaMuscular] = useState('');
  const [nivel, setNivel] = useState('');

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.titulo}>FitSmart Perfil</Text>
      
      <Text style={styles.subtitulo}>
        Llene los siguientes campos de su perfil
      </Text>

      <Image
        source={require('../assets/Bienvenido.png')} 
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
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={genero}
          onValueChange={setGenero}
          style={styles.picker}
          mode="dropdown"
        >
          <Picker.Item label="Seleccione su genero" value="" enabled={false} style={{ color: '#ccc' }} />
          <Picker.Item label="Hombre" value="hombre" />
          <Picker.Item label="Mujer" value="mujer" />
        </Picker>
      </View>

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
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={nivel}
          onValueChange={setNivel}
          style={styles.picker}
          mode="dropdown"
        >
          <Picker.Item label="Seleccione su nivel" value="" enabled={false} style={{ color: '#ccc' }} />
          <Picker.Item label="Bajo" value="bajo" />
          <Picker.Item label="Medio" value="medio" />
          <Picker.Item label="Alto" value="alto" />
        </Picker>
      </View>

      <View style={styles.buttonContainer}>
        <PressableButton
          label="Regresar"
          onPress={() => navigation.navigate('Register')}
          style={[styles.botonBase, styles.botonOmitir]}
          textStyle={styles.textoBoton}
        />
        <PressableButton
          label="Guardar"
          onPress={() => navigation.navigate('Login')}
          style={[styles.botonBase, styles.botonContinuar]}
          textStyle={[styles.textoBoton, styles.textoBotonContinuar]}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingBottom: 40,
    backgroundColor: '#ffffff',
  },
  titulo: {
    fontSize: 26,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 15,
  },
  subtitulo: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 10,
    color: '#555',
  },
  imagen: {
    width: '100%',
    height: 200,
  },
  label: {
    fontSize: 14,
    marginBottom: 5,
    marginTop: 12,
    color: '#333',
  },
  input: {
    borderWidth: 1,
    borderColor: '#cccccc',
    borderRadius: 5,
    paddingVertical: 6,
    paddingHorizontal: 10,
    fontSize: 14,
    backgroundColor: '#f9f9f9',
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  inputWithUnit: {
    flex: 1,
    marginRight: 10,
  },
  unitText: {
    fontSize: 14,
    color: '#555',
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#cccccc',
    borderRadius: 5,
    marginBottom: 10,
    backgroundColor: '#f9f9f9',
    overflow: 'hidden',
  },
  picker: {
    height: 45,
    width: '100%',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    gap: 10,
  },
  botonBase: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  botonOmitir: {
    backgroundColor: '#D3EDC5',
  },
  botonContinuar: {
    backgroundColor: '#6699CC',
  },
  textoBoton: {
    color: '#333',
    fontWeight: 'bold',
    fontSize: 14,
  },
  textoBotonContinuar: {
    color: '#fff',
  },
});
