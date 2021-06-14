import { combineReducers } from 'redux';

import { ADD_NOTE, ADD_TODO, DELETE_NOTE, DELETE_TODO, EDIT_NOTE, EDIT_TODO, OVERWRITE_NOTES, OVERWRITE_TODOS, SIGNIN, SIGNOUT } from './action';

import { ActionType, NoteMap, TodoMap } from '../types';
import { deleteByKey, replaceByKey } from '../utils/arrayFn';


const defaultNoteState: NoteMap = {};
const updateNotes = (noteState = defaultNoteState, action: ActionType) => {
    let update: NoteMap = { ...noteState };
    switch (action.type) {
        case ADD_NOTE:
            update[action.payload.key] = action.payload;
            return update;
        case DELETE_NOTE:
            delete update[action.payload];
            return update;
        case EDIT_NOTE:
            update[action.payload.key] = action.payload;
            return update;
        case OVERWRITE_NOTES:
            return action.payload;
        default:
            return noteState;
    }
}

const defaultTodoState: TodoMap = {};
const updateTodos = (todoState = defaultTodoState, action: ActionType) => {
    let update: TodoMap = { ...todoState };
    switch (action.type) {
        case ADD_TODO:
            update[action.payload.key] = action.payload;
            return update;
        case DELETE_TODO:
            delete update[action.payload];
            return update;
        case EDIT_TODO:
            update[action.payload.key] = action.payload;
            return update;
        case OVERWRITE_TODOS:
            return action.payload;
        default:
            return todoState;
    }
}

const updateAccount = (account = null, action: ActionType) => {
    switch (action.type) {
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
