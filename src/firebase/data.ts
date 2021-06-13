import { showMessage } from 'react-native-flash-message';

import { theme } from '../data/colors';
import { NoteMap, NoteType, TodoMap, TodoType } from '../types';
import firebaseConfig from './config';

const db: firebaseConfig.database.Database = firebaseConfig.database();

const defErrCallback = (err: Error | null) => {
    if (err)
        showMessage({
            backgroundColor: theme.modalBgC,
            color: theme.accent,
            description: err.toString(),
            message: 'There was an error accessing cloud storage',
        });
}

// add actions
export const firebaseAddNote = (uid: string, payload: NoteType, callback: ((err: Error | null) => any) = defErrCallback) => {
    let update: any = {};

    update[`/UserData/${uid}/notekeys/${payload.key}`] = true;
    update[`/UserData/${uid}/notes/${payload.key}`] = payload;

    db.ref().update(update, callback);
}

export const firebaseAddTodo = (uid: string, payload: TodoType, callback: ((err: Error | null) => any) = defErrCallback) => {
    let update: any = {};

    update[`/UserData/${uid}/todokeys/${payload.key}`] = true;
    update[`/UserData/${uid}/todos/${payload.key}`] = payload;

    db.ref().update(update, callback);
}

// delete actions
export const firebaseDeleteNote = (uid: string, noteKey: string, callback: ((err: Error | null) => any) = defErrCallback) => {
    let update: any = {};

    update[`/UserData/${uid}/notekeys/${noteKey}`] = null;
    update[`/UserData/${uid}/notes/${noteKey}`] = null;

    db.ref().update(update, callback);
}

export const firebaseDeleteTodo = (uid: string, todoKey: string, callback: ((err: Error | null) => any) = defErrCallback) => {
    let update: any = {};

    update[`/UserData/${uid}/todokeys/${todoKey}`] = null;
    update[`/UserData/${uid}/todos/${todoKey}`] = null;

    db.ref().update(update, callback);
}    

// user data complete overwrite
export const firebaseOverwriteUserData = (uid: string, payload: { notes: NoteMap, todos: TodoMap }, callback: ((err: Error | null) => any) = defErrCallback) => {
    let update: any = {};
    let notekeys: any = {};
    let todokeys: any = {};

    Object.keys(payload.notes).forEach(key => notekeys[key] = true);
    Object.keys(payload.todos).forEach(key => todokeys[key] = true);

    update[`/UserData/${uid}/notekeys/`] = notekeys;
    update[`/UserData/${uid}/todokeys/`] = todokeys;
    update[`/UserData/${uid}/notes/`] = payload.notes;
    update[`/UserData/${uid}/todos/`] = payload.todos;

    db.ref().update(update, callback);
}

// 
export const firebaseSetNote = (uid: string, payload: NoteType, callback: ((err: Error | null) => any) = defErrCallback) =>
    db.ref(`/UserData/${uid}/notes/${payload.key}`).set(payload, callback);

export const firebaseSetTodo = (uid: string, payload: TodoType, callback: ((err: Error | null) => any) = defErrCallback) =>
    db.ref(`/UserData/${uid}/todos/${payload.key}`).set(payload, callback);
