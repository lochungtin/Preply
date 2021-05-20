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

// redux types
export interface ActionType {
    type: string,
    payload?: any
}

// settings config
export interface SettingsType {
    colorScheme: ColorSchemeType,
    darkMode: boolean,
}

// numpad config
export interface NumpadConfigType {
    name: string,
    onPress: () => void,
}

// color scheme
export interface ColorModeType {
    backgroundC: string,
    secondaryBgC: string,
    textC: string,
    lowContrast: string,
    highContrast: string,
    midTone: string
}

export interface ColorSchemeType {
    backgroundC: string,
    drawerBgC: string,
    drawerIconC: string,
    headerC: string,
    modalBgC: string,
    recordBgC: string,
    recordBtnC: string,
    separatorLineC: string,
    textC: string,
}

// calendar types
export interface CalendarDateType {
    date: number
    month: number
}
