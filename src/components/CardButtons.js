import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';

export default function CardButtons({ label, imageSource, onPress, isSelected }) {
  return (
    <TouchableOpacity style={[styles.card, isSelected && styles.selectedCard  ]} onPress={onPress}>
      <Image source={imageSource} style={styles.cardImage}/>
      <Text style={styles.cardText}>{label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    width: '100%', // Ocupa todo el ancho del contenedor padre
    aspectRatio: 1, 
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    padding: 10,
    borderWidth: 2,
    borderColor: 'transparent'
  },
  selectedCard: {
    borderColor: '#007bff', // borde azul si está seleccionado
  },
  cardImage: {
    width: '80%',
    height: '70%',
    resizeMode: 'contain',
  },
  cardText: {
    marginTop: 8,
    fontSize: 16,
    fontWeight: '500',
    textAlign: 'center',
  },
});