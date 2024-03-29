import firebase from "firebase";
import { LogBox } from 'react-native';
import { apiKey } from "../data/secrets";

LogBox.ignoreLogs(['Setting a timer']);

let config = {
    apiKey,
    appId: '1:390413415136:android:766638b354cc8ad4ce1685',
    authDomain: 'preply-b21f6.firebaseapp.com',
    databaseURL: 'https://preply-b21f6-default-rtdb.europe-west1.firebasedatabase.app',
    messagingSenderId: '390413415136',
    projectId: 'preply-b21f6',
    storageBucket: 'preply-b21f6.appspot.com',
}

firebase.initializeApp(config);

export default firebase;
