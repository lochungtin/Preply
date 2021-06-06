import { NoteType, TodoType, } from '../types';

// note actions
export const ADD_NOTE = 'ADD_NOTE';
export const addNote = (payload: NoteType) => ({
    type: ADD_NOTE,
    payload,
});

export const DELETE_NOTE = 'DELETE_NOTE';
export const deleteNote = (payload: string) => ({
    type: DELETE_NOTE,
    payload,
});

export const EDIT_NOTE = 'EDIT_NOTE';
export const editNote = (payload: NoteType) => ({
    type: EDIT_NOTE,
    payload,
});

// todo actions
export const ADD_TODO = 'ADD_TODO';
export const addTodo = (payload: TodoType) => ({
    type: ADD_TODO,
    payload,
});

export const DELETE_TODO = 'DELETE_TODO';
export const deleteTodo = (payload: string) => ({
    type: DELETE_TODO,
    payload,
});

export const EDIT_TODO = 'EDIT_TODO';
export const editTodo = (payload: TodoType) => ({
    type: EDIT_TODO,
    payload,
});
