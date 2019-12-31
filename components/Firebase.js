import * as firebase from 'firebase';

// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyC1MjqL8K7WgTrmdVxfYW6B2M4F3LinF4U",
  authDomain: "my-mobile-app-32a00.firebaseapp.com",
  databaseURL: "https://my-mobile-app-32a00.firebaseio.com",
  storageBucket: "my-mobile-app-32a00.appspot.com"
};

firebase.initializeApp(firebaseConfig);

export default firebase;