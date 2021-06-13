import { NoteMap, NoteType, TodoMap, TodoType } from '../types';
import firebaseConfig from './config';

const db: firebaseConfig.database.Database = firebaseConfig.database();

export const firebaseDeleteTodo = (uid: string, todoKey: string, callback?: ((err: Error | null) => any)) =>
    db.ref(`/UserData/${uid}/todos/${todoKey}`).remove(callback);

export const firebaseDeleteNote = (uid: string, noteKey: string, callback?: ((err: Error | null) => any)) =>
    db.ref(`/UserData/${uid}/notes/${noteKey}`).remove(callback);

export const firebaseOverwriteUserData = (uid: string, payload: { notes: NoteMap, todos: TodoMap }, callback?: ((err: Error | null) => any)) => {
    let update: any = {};

    update[`/UserData/${uid}/notes/`] = payload.notes;
    update[`/UserData/${uid}/todos/`] = payload.todos;

    db.ref().update(update, callback);
}

export const firebaseSetTodo = (uid: string, payload: TodoType, callback?: ((err: Error | null) => any)) =>
    db.ref(`/UserData/${uid}/todos/${payload.key}`).set(payload, callback);

export const firebaseSetNote = (uid: string, payload: NoteType, callback?: ((err: Error | null) => any)) =>
    db.ref(`/UserData/${uid}/notes/${payload.key}`).set(payload, callback);
