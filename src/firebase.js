import firebase from 'firebase/app';
import 'firebase/auth';

const app = firebase.initializeApp({
  apiKey: "AIzaSyBFOAzRp8gx0gYZSPMamvHOYPJ6ifyn8AM",
  authDomain: "loginreact-64630.firebaseapp.com",
  projectId: "loginreact-64630",
  storageBucket: "loginreact-64630.appspot.com",
  messagingSenderId: "78120146019",
  appId: "1:78120146019:web:00205dedc571e5c3805456"
})

export const auth = firebase.auth();

export default app;