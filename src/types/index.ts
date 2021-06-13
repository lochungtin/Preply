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

export interface MetaDateType {
    creation: string,
    modified: string,
}

export interface TodoType {
    allDay: boolean,
    content: string,
    date: string,
    key: string,
    meta: MetaDateType,
    notif: boolean,
    repeatKey: string,
    tagKey: string,
    title: string,
    time: string,
}

export interface TodoMap {
    [key: string]: TodoType,
}

export interface NoteType {
    content: string,
    meta: MetaDateType,
    key: string,
    tagKey: string,
    title: string,
}

export interface NoteMap {
    [key: string]: NoteType,
}

// redux type
export interface ActionType {
    type: string,
    payload?: any
}

// data types
// app color scheme
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

// calendar date type
export interface CalendarDateType {
    date: number,
    month: number,
    year: number,
}

// unit matrix type
export interface UnitMatrixType {
    default: {
        from: number,
        to: number,
    }
    labels: Array<string>,
    matrix: Array<Array<(arg: number) => number>>,
    typeName: string,
}

// mappable config types
// numpad btn config
export interface NumpadConfigType {
    name: string,
    onPress: () => void,
}

// clock btn config
export interface ClockConfigType {
    height: number,
    values: Array<string>,
    width: number
}

// util types
// rpn prec map type
export interface PrecMapType {
    [index: string]: number
}

// account types
export interface AccountType {
    email: string,
    uid: string,
    useGoogle: boolean,
}
