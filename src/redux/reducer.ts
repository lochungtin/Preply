import { combineReducers } from 'redux';

import { ActionType, NoteType, RoutineType, TagType, TodoType, } from '../types';
import { deleteByKey, replaceByKey } from '../utils/arrayFn';
import { ADD_NOTE, ADD_ROUTINE, ADD_TAG, ADD_TODO, DELETE_NOTE, DELETE_ROUTINE, DELETE_TAG, DELETE_TODO, EDIT_NOTE, EDIT_ROUTINE, EDIT_TAG, EDIT_TODO } from './action';

const defaultNoteState: Array<NoteType> = [];
const updateNotes = (noteState = defaultNoteState, action: ActionType) => {
    let update = noteState;
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

const defaultRoutineState: Array<RoutineType> = [];
const updateRoutines = (routineState = defaultRoutineState, action: ActionType) => {
    let update = routineState;
    switch (action.type) {
        case ADD_ROUTINE:
            update.push(action.payload);
            return update;
        case DELETE_ROUTINE:
            deleteByKey(update, action.payload);
            return update;
        case EDIT_ROUTINE:
            replaceByKey(update, action.payload);
            return update;
        default:
            return routineState;
    }
}

const defaultTagState: Array<TagType> = [];
const updateTags = (tagState = defaultTagState, action: ActionType) => {
    let update = tagState;
    switch (action.type) {
        case ADD_TAG:
            update.push(action.payload);
            return update;
        case DELETE_TAG:
            deleteByKey(update, action.payload);
            return update;
        case EDIT_TAG:
            replaceByKey(update, action.payload);
            return update;
        default:
            return tagState;
    }
}

const defaultTodoState: Array<TodoType> = [];
const updateTodos = (todoState = defaultTodoState, action: ActionType) => {
    let update = todoState;
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
    routines: updateRoutines,
    tags: updateTags,
    todos: updateTodos,
});
