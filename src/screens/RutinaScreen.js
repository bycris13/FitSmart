import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Modal,
  TextInput,
  Image,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import BottomNavigationBar from '../components/BottomNavigationBar';

const dias = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];

const opcionesRutinas = [
  { nombre: 'Espalda', imagen: require('../assets/Espalda.png') },
  { nombre: 'Abdomen', imagen: require('../assets/Abdomen.png') },
  { nombre: 'Pecho', imagen: require('../assets/Pecho.png') },
  { nombre: 'Piernas', imagen: require('../assets/Piernas.png') },
  { nombre: 'Hombros', imagen: require('../assets/Hombros.png') },
  { nombre: 'Brazos', imagen: require('../assets/Brazos.png') },
];

export default function RutinaScreen() {
  const [rutinas, setRutinas] = useState({});
  const [diaSeleccionado, setDiaSeleccionado] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [nuevaRutina, setNuevaRutina] = useState({
    nombre: '',
    repeticiones: '',
    tiempo: '',
    peso: '',
  });

  const navigation = useNavigation();

  // Cargar rutinas al iniciar
  useEffect(() => {
    const cargarRutinas = async () => {
      try {
        const rutinasGuardadas = await AsyncStorage.getItem('rutinas');
        if (rutinasGuardadas !== null) {
          setRutinas(JSON.parse(rutinasGuardadas));
        }
      } catch (error) {
        console.error('Error al cargar rutinas:', error);
      }
    };
    cargarRutinas();
  }, []);

  // Guardar rutinas al cambiar
  useEffect(() => {
    const guardarRutinas = async () => {
      try {
        await AsyncStorage.setItem('rutinas', JSON.stringify(rutinas));
      } catch (error) {
        console.error('Error al guardar rutinas:', error);
      }
    };
    guardarRutinas();
  }, [rutinas]);

  const toggleDia = (dia) => {
    setDiaSeleccionado(diaSeleccionado === dia ? null : dia);
  };

  const handleAgregar = () => {
    if (!nuevaRutina.nombre) return;
    const actual = rutinas[diaSeleccionado] || [];
    setRutinas({
      ...rutinas,
      [diaSeleccionado]: [...actual, nuevaRutina],
    });
    setNuevaRutina({ nombre: '', repeticiones: '', tiempo: '', peso: '' });
    setModalVisible(false);
  };

  const handleEliminar = (index) => {
    const actual = rutinas[diaSeleccionado] || [];
    const actualizado = actual.filter((_, i) => i !== index);
    setRutinas({ ...rutinas, [diaSeleccionado]: actualizado });
  };

  const renderDia = ({ item: dia }) => (
    <View style={styles.diaContainer}>
      <TouchableOpacity onPress={() => toggleDia(dia)} style={styles.diaBtn}>
        <Text style={styles.diaTexto}>{dia}</Text>
      </TouchableOpacity>

      {diaSeleccionado === dia && (
        <View>
          {(rutinas[dia] || []).map((item, index) => (
            <View key={index} style={styles.rutina}>
              <Text style={styles.nombre}>{item.nombre}</Text>
              <Text>Repeticiones: {item.repeticiones}</Text>
              <Text>Tiempo: {item.tiempo} min</Text>
              <Text>Peso: {item.peso} kg</Text>
              <View style={styles.botones}>
                <TouchableOpacity onPress={() => handleEliminar(index)} style={styles.btnEliminar}>
                  <Ionicons name='trash' size={28}/>
                </TouchableOpacity>
              </View>
            </View>
          ))}
          <TouchableOpacity style={styles.btnAnadir} onPress={() => setModalVisible(true)}>
            <Text style={styles.btnTexto}>Añadir Rutina</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={dias}
        keyExtractor={(item) => item}
        renderItem={renderDia}
        contentContainerStyle={{ paddingBottom: 120 }}
        ListHeaderComponent={
          <>
            <Text style={styles.titulo}>Rutinas</Text>
            <Image
              source={require('../assets/amarillo.png')}
              style={styles.imagen}
              resizeMode="cover"
            />
          </>
        }
      />

      <Modal visible={modalVisible} animationType="slide" transparent>
      <KeyboardAvoidingView 
              style={{flex: 1}}
              behavior={Platform.OS === "ios" ? "padding" : "height"}
            >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitulo}>Nueva Rutina</Text>

            <Text style={{ fontWeight: 'bold', marginBottom: 5 }}>Selecciona una rutina:</Text>
            <View style={styles.opcionesContainer}>
              {opcionesRutinas.map((opcion) => (
                <TouchableOpacity
                  key={opcion.nombre}
                  style={[
                    styles.opcionCard,
                    nuevaRutina.nombre === opcion.nombre && styles.opcionSeleccionada,
                  ]}
                  onPress={() => setNuevaRutina({ ...nuevaRutina, nombre: opcion.nombre })}
                >
                  <Image source={opcion.imagen} style={styles.opcionImagen} />
                  <Text style={styles.opcionTexto}>{opcion.nombre}</Text>
                </TouchableOpacity>
              ))}
            </View>  

            <TextInput
              placeholder="Repeticiones"
              placeholderTextColor="#666"
              style={styles.input}
              keyboardType="numeric"
              value={nuevaRutina.repeticiones}
              onChangeText={(text) => setNuevaRutina({ ...nuevaRutina, repeticiones: text })}
              />

            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
              <TextInput
                placeholder="Tiempo"
                placeholderTextColor="#666"
                style={[styles.input, { flex: 1 }]}
                keyboardType="numeric"
                value={nuevaRutina.tiempo}
                onChangeText={(text) => setNuevaRutina({ ...nuevaRutina, tiempo: text })}
                />
              <Text style={{ marginLeft: 5 }}>min</Text>
            </View>

            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
              <TextInput
                placeholder="Peso"
                placeholderTextColor="#666"
                style={[styles.input, { flex: 1 }]}
                keyboardType="numeric"
                value={nuevaRutina.peso}
                onChangeText={(text) => setNuevaRutina({ ...nuevaRutina, peso: text })}
                />
              <Text style={{ marginLeft: 5 }}>kg</Text>
            </View>

            <View style={styles.modalBotones}>
              <TouchableOpacity onPress={handleAgregar} style={styles.btnGuardar}>
                <Text style={styles.btnTexto}>Guardar</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.btnCancelar}>
                <Text style={styles.btnTexto}>Cancelar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
      </Modal>
      {/* Componente barra de navegacion */}
      <BottomNavigationBar/> 
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
     flex: 1,
     backgroundColor: '#fff',
     paddingVertical: '7%',
  },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    marginTop: 20,
  },
  imagen: {
    width: '80%',
    height: 200,
    borderRadius: 10,
    alignSelf: 'center',
    marginBottom: 30,
  },
  diaContainer: {
    marginBottom: 15,
    paddingHorizontal: 25,
  },
  diaBtn: {
    backgroundColor: '#f0ec98',
    padding: 10,
    borderRadius: 8,
  },
  diaTexto: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  rutina: {
    backgroundColor: '#e0e0e0',
    padding: 12,
    borderRadius: 10,
    marginTop: 8,
  },
  nombre: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  botones: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 10,
  },
  btnEliminar: {
    backgroundColor: '#d9534f',
    padding: 8,
    borderRadius: 5,
  },
  btnAnadir: {
    backgroundColor: '#f3f3d2',
    padding: 10,
    borderRadius: 8,
    marginTop: 10,
    alignItems: 'center',
  },
  btnTexto: {
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000000aa',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    width: '90%',
  },
  modalTitulo: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
  },
  modalBotones: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  btnGuardar: {
    backgroundColor: '#93c8ef',
    padding: 10,
    borderRadius: 8,
    flex: 1,
    marginRight: 5,
  },
  btnCancelar: {
    backgroundColor: '#efef93',
    padding: 10,
    borderRadius: 8,
    flex: 1,
    marginLeft: 5,
  },
  opcionesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  opcionCard: {
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#ccc',
    borderRadius: 10,
    padding: 5,
    width: '30%',
    marginBottom: 10,
  },
  opcionSeleccionada: {
    borderColor: '#007BFF',
  },
  opcionImagen: {
    width: 60,
    height: 60,
    resizeMode: 'cover',
    borderRadius: 8,
    marginBottom: 5,
  },
  opcionTexto: {
    fontWeight: 'bold',
    textAlign: 'center',
  },
 
});
