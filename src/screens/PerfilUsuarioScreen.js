import React, { useState, useCallback } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import BottomNavigationBar from '../components/BottomNavigationBar';
import { auth, db } from '../firebase/firebaseConfig';
import { doc, getDoc } from 'firebase/firestore';

export default function PerfilUsuarioScreen() {
  const navigation = useNavigation();
  const [perfil, setPerfil] = useState(null);
  const [loading, setLoading] = useState(true);

  useFocusEffect(
    useCallback(() => {
      const fetchPerfil = async () => {
        try {
          const user = auth.currentUser;
          if (!user) return;
          const docRef = doc(db, 'usuarios', user.uid);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            setPerfil(docSnap.data());
          } else {
            console.log('Perfil no encontrado');
          }
        } catch (error) {
          console.log('Error al obtener perfil:', error);
        } finally {
          setLoading(false);
        }
      };

      setLoading(true); // Reinicia loading
      fetchPerfil();
    }, [])
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#6699CC" />
      </View>
    );
  }

  if (!perfil) {
    return (
      <View style={styles.loadingContainer}>
        <Text>No se encontraron datos del perfil.</Text>
        <TouchableOpacity
          style={styles.botonEditar}
          onPress={() => navigation.navigate('ProfileSetup')}
        >
          <Text style={styles.textoEditar}>Editar perfil</Text>
        </TouchableOpacity>
      </View>
    );
  }

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
    fontSize: 16,
    fontWeight: 'bold',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
