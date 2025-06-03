// Firebase.js
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyAxAC_HADBigexT_VuyiaXUvo4cLYE1-Nk",
  authDomain: "appgestionclientes-50758.firebaseapp.com",
  projectId: "appgestionclientes-50758",
  storageBucket: "appgestionclientes-50758.appspot.com", 
  messagingSenderId: "481436514282",
  appId: "1:481436514282:web:945333552ddc2c9eb8e493"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
