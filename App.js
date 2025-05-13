import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet } from 'react-native';
import  LoginScreen  from "./src/screens/LoginScreen";
import RegisterScreen from './src/screens/RegisterScreen';
import SelectBodyPartScreen from './src/screens/SelectBodyPartScreen';
import RestorePassword from './src/screens/RestorePassword';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login"    component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name='SelectBodyPart' component={SelectBodyPartScreen}/>
        <Stack.Screen name='RestorePassword' component={RestorePassword}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
