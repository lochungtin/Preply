import { NoteMap, TodoMap } from ".";

export interface KeylistType {
    [key: string]: true,
}

export interface KeylistSnapshotType {
    notekeys: KeylistType,
    todokeys: KeylistType,
}

export interface FullSnapshotType {
    keylist: KeylistSnapshotType,
    notes: NoteMap,
    todos: TodoMap,
}