import { repeatType } from './routineTypes';
import { DistanceUnits, TemperatureUnits, WeightUnits, } from './unitTypes';

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

// redux type
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
    accent: string,
    backgroundC: string,
    secondaryBgC: string,
    dTextC: string,
    textC: string,
    lowContrast: string,
    highContrast: string,
    midTone: string
}

export interface ColorSchemeType {
    accent: string,
    backgroundC: string,
    drawerIconC: string,
    dTextC: string,
    headerC: string,
    modalBgC: string,
    recordBgC: string,
    recordBtnC: string,
    separatorLineC: string,
    textC: string,
}

// calendar type
export interface CalendarDateType {
    date: number,
    month: number,
    year: number,
}

// clock btn config
export interface ClockConfigType {
    height: number,
    values: Array<string>,
    width: number
}

// unit matrix type
export interface UnitMatrixType {
    labels: Array<DistanceUnits | TemperatureUnits | WeightUnits>,
    matrix: Array<Array<(arg: number) => number>>,
}
