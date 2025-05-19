import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import LoginScreen from "./src/screens/LoginScreen";
import RegisterScreen from './src/screens/RegisterScreen';
import SelectBodyPartScreen from './src/screens/SelectBodyPartScreen';
import RestorePassword from './src/screens/RestorePassword';
import ProfileSetupScreen from './src/screens/ProfileSetupScreen';
import HomeScreen from './src/screens/HomeScreen';
import VideosScreen from './src/screens/VideosScreen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import PerfilUsuarioScreen from './src/screens/PerfilUsuarioScreen';
import RutinaScreen from './src/screens/RutinaScreen';
import AuthLoadingScreen from './src/screens/AuthLoadingScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName='AuthLoading'>
        <Stack.Screen name="AuthLoading" component={AuthLoadingScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="SelectBodyPart" component={SelectBodyPartScreen} options={{gestureEnabled: false}} />
        <Stack.Screen name="RestorePassword" component={RestorePassword} />
        <Stack.Screen name="ProfileSetup" component={ProfileSetupScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="videosRutina" component={VideosScreen} />
        <Stack.Screen name="PerfilUsuario" component={PerfilUsuarioScreen} />
        <Stack.Screen name="Rutinas" component={RutinaScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}