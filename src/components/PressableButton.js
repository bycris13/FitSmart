import { Text, Pressable } from "react-native";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";

export default function PressableButton({label, onPress, style, textStyle}) {
  return (
    <Pressable style={({ pressed }) => [style, { opacity: pressed ? 0.6 : 1 }]} onPress={onPress}>
      <Text style={textStyle}>{label}</Text>
    </Pressable>
  );
}
