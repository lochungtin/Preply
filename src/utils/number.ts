export const appendZeros = (num: string, digits: number): string => num.length >= digits ? num : appendZeros(num + '0', digits);

export const insertZeros = (num: string, digits: number): string => num.length >= digits ? num : insertZeros('0' + num, digits);
