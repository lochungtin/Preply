import { combineReducers } from 'redux';

import { ADD_NOTE, ADD_TODO, DELETE_NOTE, DELETE_TODO, EDIT_NOTE, EDIT_TODO, OVERWRITE_NOTES, OVERWRITE_TODOS, SIGNIN, SIGNOUT, UPDATE_SYNC_OPTION } from './action';

import { AccountType, ActionType, NoteMap, SyncOptionType, TodoMap } from '../types';
import { syncOptions } from '../data/dataSync';

const updateAccount = (account: AccountType | null = null, action: ActionType) => {
    switch (action.type) {
        case SIGNIN:
            return action.payload;
        case SIGNOUT:
            return null;
        default:
            return account;
    }
}

const defaultNoteState: NoteMap = {};
const updateNotes = (noteState: NoteMap = defaultNoteState, action: ActionType) => {
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

const updateSyncOption = (syncOpState: SyncOptionType = syncOptions[0], action: ActionType) => 
    action.type === UPDATE_SYNC_OPTION ? action.payload : syncOpState;

const defaultTodoState: TodoMap = {};
const updateTodos = (todoState: TodoMap = defaultTodoState, action: ActionType) => {
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

export default combineReducers({
    account: updateAccount,
    notes: updateNotes,
    syncOp: updateSyncOption,
    todos: updateTodos,
});
