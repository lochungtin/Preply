import { combineReducers } from 'redux';

import { ADD_NOTE, ADD_TODO, DELETE_NOTE, DELETE_TODO, EDIT_NOTE, EDIT_TODO, SIGNIN, SIGNOUT } from './action';

import { ActionType, NoteType, TodoType } from '../types';
import { deleteByKey, replaceByKey } from '../utils/arrayFn';


const defaultNoteState: Array<NoteType> = [];
const updateNotes = (noteState = defaultNoteState, action: ActionType) => {
    let update = [...noteState];
    switch (action.type) {
        case ADD_NOTE:
            update.push(action.payload);
            return update;
        case DELETE_NOTE:
            deleteByKey(update, action.payload);
            return update;
        case EDIT_NOTE:
            replaceByKey(update, action.payload);
            return update;
        default:
            return noteState;
    }
}

const defaultTodoState: Array<TodoType> = [];
const updateTodos = (todoState = defaultTodoState, action: ActionType) => {
    let update = [...todoState];
    switch (action.type) {
        case ADD_TODO:
            update.push(action.payload);
            return update;
        case DELETE_TODO:
            deleteByKey(update, action.payload);
            return update;
        case EDIT_TODO:
            replaceByKey(update, action.payload);
            return update;
        default:
            return todoState;
    }
}

const updateAccount = (account = null, action: ActionType) => {
    switch(action.type) {
        case SIGNIN:
            return action.payload;
        case SIGNOUT:
            return null;
        default:
            return account;
    }
}

export default combineReducers({
    account: updateAccount,
    notes: updateNotes,
    todos: updateTodos,
});
