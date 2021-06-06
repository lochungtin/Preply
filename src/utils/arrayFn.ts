export const deleteByKey = (arr: Array<any>, key: string) => {
    let index = arr.findIndex(elem => elem.key === key);
    arr.splice(index, 1);
}

export const replaceByKey = (arr: Array<any>, payload: any) => {
    let index = arr.findIndex(elem => elem.key === payload.key);
    arr.splice(index, 1, payload);
}
