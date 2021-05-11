import { repeatType } from './routineTypes';

// data types
export interface DateType {
    creation: string,
    modified: string,
}

export interface TagType {
    key: string,
    name: string,
    color: string,
}

export interface TodoType {
    key: string,
    title: string,
    date: DateType,
    tags: Array<TagType>,
    content: string,
}

export interface NoteType {
    key: string,
    title: string,
    date: DateType,
    tags: Array<TagType>,
    content: string,
}

export interface RoutineType {
    key: string,
    title: string,
    date: string,
    time: string,
    repeatType: repeatType,
    tags: Array<TagType>,
    content: string,
}

// other types
export interface ActionType {
    type: string,
    payload?: any
}

// settings config
export interface SettingsType {
    darkmode: boolean,
}

// numpad config
export interface NumpadConfigType {
    name: string,
    onPress: () => void,
}