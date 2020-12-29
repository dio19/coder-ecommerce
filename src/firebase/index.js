import * as firebase from 'firebase/app';
import 'firebase/firestore';

const app = firebase.initializeApp({
    apiKey: "AIzaSyCtPDngypmnJZV88UEcoONcIZ7ndIyqDwA",
    authDomain: "ecommerce-coderhouse-dio.firebaseapp.com",
    projectId: "ecommerce-coderhouse-dio",
    storageBucket: "ecommerce-coderhouse-dio.appspot.com",
    messagingSenderId: "112379894755",
    appId: "1:112379894755:web:1a65020bd1d5fb8d3a5ed6"
  });

export function getFirebase() {
    return app;
}

export function getFirestore() {
    return firebase.firestore(app);
}