import firebase from 'firebase';

import firebaseConfig from './config';

const googleProvider = new firebase.auth.GithubAuthProvider();

export const signIn = async (email: string, pswd: string) => 
    await firebaseConfig.auth().signInWithEmailAndPassword(email, pswd);

export const signInWithGoogle = async () => 
    await firebaseConfig.auth().signInWithPopup(googleProvider);

export const signOut = async () => 
    await firebaseConfig.auth().signOut();

export const signUp = async (email: string, pswd: string) => 
    await firebaseConfig.auth().createUserWithEmailAndPassword(email, pswd);
