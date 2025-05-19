import React, { useState } from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; 
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';
import { faPlay } from '@fortawesome/free-solid-svg-icons';
import { faDumbbell } from '@fortawesome/free-solid-svg-icons';
import BottomNavigationBar from "../components/BottomNavigationBar";

export default function HomeScreen({ navigation }) {

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Bienvenid@</Text>
      <Image
        source={require('../assets/Perfil4.png')} 
        style={styles.imagen}
        resizeMode="cover"
      />
      <TouchableOpacity style={styles.boton} onPress={() => navigation.navigate('PerfilUsuario')}>
        <FontAwesomeIcon icon={faUserCircle} size={25} color="#000" />
        <Text style={styles.texto}>  Perfil</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.boton} onPress={() => navigation.navigate('Rutinas')}>
        <FontAwesomeIcon icon={faDumbbell} size={25} color="#000" />
        <Text style={styles.texto}>  Rutinas</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.boton} onPress={() => navigation.navigate('videosRutina')}>
        <FontAwesomeIcon icon={faPlay} size={25} color="#000" />
        <Text style={styles.texto}>  Videos</Text>
      </TouchableOpacity>

      {/* Componente barra de navegacion */}
      <BottomNavigationBar/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
    alignItems: 'center',
  },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 40,
    marginBottom: 20, 
  },
  imagen: {
    width: '100%',
    height: 250,
    borderRadius: 10,
    marginBottom: 50, 
  },
  boton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#cde4f6',
    padding: 15,
    borderRadius: 10,
    width: '100%',
    marginBottom: 15,
  },
  texto: {
    color: '#000', 
    fontSize: 18,
  },
  
});
