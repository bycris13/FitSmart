// src/components/BottomNavigationBar.js
import React from 'react';
import { View, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function BottomNavigationBar() {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();
  // Altura adicional para Android
  const androidPadding = Platform.OS === 'android' ? -12 : -20;
  const totalBottomPadding = Math.max(insets.bottom + androidPadding, 0);


  return (
    <View style={[styles.container, {paddingBottom: totalBottomPadding, height: 60 + totalBottomPadding}]}>
      <TouchableOpacity onPress={() => navigation.navigate('Home')}>
        <Ionicons name="home" size={28} color="black" />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('PerfilUsuario')}>
        <Ionicons name="person" size={28} color="black" />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Settings')}>
        <Ionicons name="settings" size={28} color="black" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderTopWidth: 0.6,
    borderColor: '#ccc',
    backgroundColor: '#fff',
    zIndex: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 10,
  },
});
