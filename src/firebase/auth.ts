import firebase from 'firebase';

import firebaseConfig from './config';

export const signIn = async (email: string, pswd: string) => 
    await firebaseConfig.auth().signInWithEmailAndPassword(email, pswd);

export const signOut = async () => 
    await firebaseConfig.auth().signOut();

export const signUp = async (email: string, pswd: string) => 
    await firebaseConfig.auth().createUserWithEmailAndPassword(email, pswd);
