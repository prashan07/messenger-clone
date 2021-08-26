import firebase from 'firebase' 


const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyDfmTrNYcu8r4euTCeHltcgWS-l-6E7cls",
    authDomain: "messenger-clone-e8633.firebaseapp.com",
    projectId: "messenger-clone-e8633",
    storageBucket: "messenger-clone-e8633.appspot.com",
    messagingSenderId: "994454727357",
    appId: "1:994454727357:web:40d9ab3404f6c3c0f365d4",
    measurementId: "G-YTD6SR3CYB"
})

const db = firebaseApp.firestore();

export default db;
