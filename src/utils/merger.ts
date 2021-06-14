import moment from "moment";
import { NoteMap, TodoMap } from "../types";
import { FullSnapshotType, MergeType } from "../types/firebaseTypes";

const getLatest = (key: string, srcA: NoteMap | TodoMap, srcB: NoteMap | TodoMap): any => {
    if (srcA[key] && !srcB[key])
        return srcA[key];

    else if (!srcA[key] && srcB[key])
        return srcB[key];

    else {
        let srcADate: moment.Moment = moment(srcA[key].meta.modified);
        let srcBDate: moment.Moment = moment(srcB[key].meta.modified);

        return srcADate.isAfter(srcBDate) ? srcA[key] : srcB[key];
    }
}

export const merge = (notes: NoteMap, todos: TodoMap, dbSnapshot: FullSnapshotType): MergeType => {
    let rt: MergeType = {
        notes: {},
        todos: {},
    };

    let uniqueNoteKeys: Set<string> = new Set([...Object.keys(notes), ...Object.keys(dbSnapshot.keylist.notekeys || {})]);
    let uniqueTodoKeys: Set<string> = new Set([...Object.keys(todos), ...Object.keys(dbSnapshot.keylist.todokeys || {})]);

    uniqueNoteKeys.forEach(key => rt.notes[key] = getLatest(key, notes, dbSnapshot.notes));
    uniqueTodoKeys.forEach(key => rt.todos[key] = getLatest(key, todos, dbSnapshot.todos));

    return rt;
}
