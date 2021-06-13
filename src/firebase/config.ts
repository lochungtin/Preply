import firebase from "firebase";

let config = {
    apiKey: 'AIzaSyBqd92WcoxQwf2l9LF4mvnMOwd4_P0zb6o',
    appId: '1:390413415136:android:766638b354cc8ad4ce1685',
    authDomain: 'preply-b21f6.firebaseapp.com',
    databaseURL: 'https://preply-b21f6-default-rtdb.firebaseio.com',
    messagingSenderId: '390413415136',
    projectId: 'preply-b21f6',
    storageBucket: 'preply-b21f6.appspot.com',
}

firebase.initializeApp(config);

export default firebase;
