import React from "react";
import { View, Text, StyleSheet } from "react-native";
import CardButtons from "../components/CardButtons";
import PressableButton from "../components/PressableButton";


export default function SelectBodyPartsScreen() {
  const bodyParts = [
    { name: "Hombros", image: require("../assets/Hombros.png") },
    { name: "Pecho", image: require("../assets/Pecho.png") },
    { name: "Piernas", image: require("../assets/Piernas.png") },
    { name: "Espalda", image: require("../assets/Espalda.png") },
    { name: "Brazos", image: require("../assets/Brazos.png") },
    { name: "Abdomen", image: require("../assets/Abdomen.png") },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Escoja qué partes del cuerpo desea ejercitar:
      </Text>

      <View contentContainerStyle={styles.scrollContainer}>
        <View style={styles.cardsWrapper}>
          {bodyParts.map((part, index) => (
            <View style={styles.cardContainer} key={index}>
              <CardButtons
                label={part.name}
                imageSource={part.image}
                onPress={() => console.log(`${part.name} seleccionado`)}
              />
            </View>
          ))}
        </View>
      </View>
      
      <View style={styles.buttonContainer}>
        <PressableButton label={"Omitir"} style={styles.buttonOmit}/>
        <PressableButton label={"Continuar"} style={styles.buttonContinue} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    marginVertical: "15%",
    paddingBottom: 20,
  },
  scrollContainer: {
    flexGrow: 1,
  },
  cardsWrapper: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },

  cardContainer: {
    width: "48%", // Deja un pequeño espacio entre cards
    marginBottom: 15,
    shadowColor:'#000',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },

  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginVertical: '10%'
  },

  buttonOmit:{
    backgroundColor: '#b4d5a6',
    padding: '4%',
    borderRadius: 8,
  },

  buttonContinue:{
    backgroundColor: '#9ec4f7',
    padding: '4%',
    borderRadius: 8,
  }
});
