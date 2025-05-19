import React, { useState } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity, FlatList, Dimensions, Linking } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import BottomNavigationBar from "../components/BottomNavigationBar";

/* const obtenerMiniatura = (url) => {
  const match = url.match(/v=([^&]+)/);
  const videoId = match ? match[1] : '';
  return https://img.youtube.com/vi/${videoId}/hqdefault.jpg;
}; */

const ejercicios = [
  {
    id: "1",
    nombre: "Rutina de abdomen",
    imagen: require("../assets/Abdomen.png"),
    link: "https://www.youtube.com/watch?v=CduA0TULnow&list=RDCduA0TULnow&start_radio=1",
  },
  {
    id: "2",
    nombre: "Rutina de pecho",
    imagen: require("../assets/Pecho.png"),
    link: "https://www.youtube.com/watch?v=CduA0TULnow&list=RDCduA0TULnow&start_radio=1",
  },
  {
    id: "3",
    nombre: "Rutina de piernas",
    imagen: require("../assets/Piernas.png"),
    link: "https://www.youtube.com/watch?v=CduA0TULnow&list=RDCduA0TULnow&start_radio=1",
  },
  {
    id: "4",
    nombre: "Rutina de hombros",
    imagen: require("../assets/Hombros.png"),
    link: "https://www.youtube.com/watch?v=CduA0TULnow&list=RDCduA0TULnow&start_radio=1",
  },
  {
    id: "5",
    nombre: "Rutina de espalda",
    imagen: require("../assets/Espalda.png"),
    link: "https://www.youtube.com/watch?v=CduA0TULnow&list=RDCduA0TULnow&start_radio=1",
  },
  {
    id: "6",
    nombre: "Rutina de calentamiento",
    imagen: require("../assets/rutina2.png"),
    link: "https://www.youtube.com/watch?v=CduA0TULnow&list=RDCduA0TULnow&start_radio=1",
  },
];

export default function VideosScreen() {
  const navigation = useNavigation();

  const handleOpenLink = (url) => {
    Linking.openURL(url).catch((err) =>
      console.error("Error al abrir el enlace:", err)
    );
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => handleOpenLink(item.link)}
    >
      <Image source={item.imagen} style={styles.image} />
      <View style={styles.textContainer}>
        <Text style={styles.exerciseName}>{item.nombre}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Videos Rutinas</Text>

      <FlatList
        data={ejercicios}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
      />
      {/* Componente barra de navegacion */}
        <BottomNavigationBar />
    </View>
  );
}

const screenWidth = Dimensions.get("window").width;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 40,
    paddingHorizontal: 10,
    paddingBottom: 70, // Añade espacio para la barra de navegación
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    color: "#333",
  },
  list: {
    paddingBottom: 20,
  },
  card: {
    width: screenWidth - 20,
    borderRadius: 10,
    overflow: "hidden",
    backgroundColor: "#f6eefb",
    marginBottom: 20,
    alignSelf: "center",
    elevation: 3,
  },
  image: {
    width: "100%",
    height: 180,
    resizeMode: "contain",
    backgroundColor: "#f9f6fb",
  },
  textContainer: {
    padding: 15,
  },
  exerciseName: {
    fontSize: 18,
    fontWeight: "600",
    color: "#222",
  },
  navBarContainer: {
    position: 'absolute',
    bottom: 10,
    left: 0,
    right: 0,
    zIndex: 10,
  },
});