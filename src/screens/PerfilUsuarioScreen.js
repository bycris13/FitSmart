import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import BottomNavigationBar from '../components/BottomNavigationBar';

export default function PerfilUsuarioScreen() {
  const navigation = useNavigation();

  // Datos de ejemplo (puedes luego obtenerlos de un contexto o async storage)
  const [perfil, setPerfil] = useState({
    nombreApellido: 'Paula Dotor',
    edad: '21',
    genero: 'Mujer',
    altura: '1.60',
    peso: '60',
    masaMuscular: '24.5',
    nivel: 'Medio',
  });

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scroll}>
        <Text style={styles.titulo}>Perfil de Usuario</Text>

        <Image
          source={require('../assets/PerfilUs.png')}
          style={styles.imagen}
          resizeMode="contain"
        />

        <View style={styles.infoContainer}>
          <Text style={styles.label}>Nombre y Apellido:</Text>
          <Text style={styles.valor}>{perfil.nombreApellido}</Text>

          <Text style={styles.label}>Edad:</Text>
          <Text style={styles.valor}>{perfil.edad} años</Text>

          <Text style={styles.label}>Género:</Text>
          <Text style={styles.valor}>{perfil.genero}</Text>

          <Text style={styles.label}>Altura:</Text>
          <Text style={styles.valor}>{perfil.altura} m</Text>

          <Text style={styles.label}>Peso:</Text>
          <Text style={styles.valor}>{perfil.peso} Kg</Text>

          <Text style={styles.label}>Masa muscular:</Text>
          <Text style={styles.valor}>{perfil.masaMuscular} IMC</Text>

          <Text style={styles.label}>Nivel de experiencia:</Text>
          <Text style={styles.valor}>{perfil.nivel}</Text>
        </View>

        <TouchableOpacity
          style={styles.botonEditar}
          onPress={() => navigation.navigate('ProfileSetup')}
        >
          <Text style={styles.textoEditar}>Editar perfil</Text>
        </TouchableOpacity>
      </ScrollView>
      {/* Componente barra de navegacion */}
      <BottomNavigationBar/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    paddingTop: 40,
  },
  scroll: {
    paddingBottom: 100,
    paddingHorizontal: 20,
  },
  titulo: {
    fontSize: 26,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#333',
  },
  imagen: {
    width: '100%',
    height: 180,
    marginBottom: 20,
  },
  infoContainer: {
    backgroundColor: '#f3f3f3',
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#444',
    marginTop: 10,
  },
  valor: {
    fontSize: 16,
    color: '#222',
  },
  botonEditar: {
    backgroundColor: '#c1f3cd',
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
  },
  textoEditar: {
    color: '',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
