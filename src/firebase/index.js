import * as firebase from 'firebase/app';
import 'firebase/firestore';

const app = firebase.initializeApp({
    apiKey: "AIzaSyBXjcNY88S7d2-K23laMCWWAbhQs_RRnz8",
    authDomain: "coder-ecommerce-dio.firebaseapp.com",
    projectId: "coder-ecommerce-dio",
    storageBucket: "coder-ecommerce-dio.appspot.com",
    messagingSenderId: "28982305992",
    appId: "1:28982305992:web:98a8177a011f6ddbb7f1fd"
  });

export function getFirebase() {
    return app;
}

export function getFirestore() {
    return firebase.firestore(app);
}