import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth/web-extension";

// Tu configuración de Firebase (cópiala de la consola)
const firebaseConfig = {
  apiKey: "AIzaSyBfomslni7OEQW4hMNDwIiC29TyIOLkgS4",
  authDomain: "fitsmart-6ad58.firebaseapp.com",
  projectId: "fitsmart-6ad58",
  storageBucket: "fitsmart-6ad58.firebasestorage.app",
  messagingSenderId: "981011680557",
  appId: "1:981011680557:web:ef99996aa32c8c7eadd7a4"
};

// Inicializa la app de Firebase
const app = initializeApp(firebaseConfig);

// Inicializa Firebase Auth usando el adaptador de React Native
const auth =  getAuth(app);

// Exporta la instancia de auth para usarla en pantallas
export { auth };
