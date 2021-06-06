import { repeatType } from './routineTypes';
import { DistanceUnits, TemperatureUnits, WeightUnits, } from './unitTypes';

// data types
export interface TagType {
    color: string,
    key: string,
    name: string,
}

export interface RepeatType {
    key: string,
    name: string,
}

export interface TodoType {
    content: string,
    date: string,
    key: string,
    repeatKey: string,
    tagKey: string,
    title: string,
}

export interface NoteType {
    key: string,
    title: string,
    date: {
        creation: string,
        modified: string,
    },
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
