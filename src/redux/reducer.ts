import { combineReducers } from 'redux';

import { ActionType, NoteType, TodoType, } from '../types';
import { deleteByKey, replaceByKey } from '../utils/arrayFn';
import { ADD_NOTE, ADD_TODO, DELETE_NOTE, DELETE_TODO, EDIT_NOTE, EDIT_TODO, } from './action';

const defaultNoteState: Array<NoteType> = [];
const updateNotes = (noteState = defaultNoteState, action: ActionType) => {
    console.log(action.payload);
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

export default combineReducers({
    notes: updateNotes,
    todos: updateTodos,
});
