import firebaseConfig from './config';

const db: firebaseConfig.database.Database = firebaseConfig.database();

export const firebaseAddData = (id: string, path: string, type: any) => db.ref(`/UserData/${id}/${path}`).push({ type });

export const firebaseDeleteData = (id: string, path: string, type: any) => db.ref(`/UserData/${id}/${path}`).child(type).remove();

export const firebaseUpdateData = (firebaseID: string, details: any) => db.ref(`/UserData/${firebaseID}`).set({ details });

