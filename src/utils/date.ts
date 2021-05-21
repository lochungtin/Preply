import moment from 'moment';
import { insertZeros } from './number';

import { CalendarDateType } from '../types';

const isLeapYear = (year: number): boolean => ((year % 4 == 0) && (year % 100 != 0)) || (year % 400 == 0);

const isOddMonth = (month: number): boolean => ((month > 7) && (month % 2 == 0)) || ((month < 8) && (month % 2 == 1));

export const getDateNo = (year: number, month: number): number => {
    if (month === 2)
        return isLeapYear(year) ? 29 : 28;
    else 
        return isOddMonth(month) ? 31 : 30;
}

interface CalendarUpdatePair {
    month: number,
    year: number,
}

export const getPrevMonth = (year: number, month: number): CalendarUpdatePair => ({
    month: Math.floor(1 / month) * 12 + month - 1,
    year: year - Math.floor(1 / month),
});

export const getNextMonth = (year: number, month: number): CalendarUpdatePair => ({
    month: month % 12 + 1,
    year: year + Math.floor(month / 12),
});

export const genCalendar = (year: number, month: number): Array<Array<CalendarDateType>> => {
    let startDay: number = moment(`${year}-${insertZeros(month.toString(), 2)}-01`).weekday();
    let dayCount: number = getDateNo(year, month);
    let cellCount: number = Math.ceil((startDay + dayCount) / 7) * 7;

    let prevMonth: CalendarUpdatePair = getPrevMonth(year, month);
    let nextMonth: CalendarUpdatePair = getNextMonth(year, month);
    let gridStart: number = getDateNo(year, prevMonth.month) - startDay + 1;

    let grid: Array<Array<CalendarDateType>> = [];

    for (let i = 0; i < cellCount; ++i) {
        let row = Math.floor(i / 7);
        let col = i % 7;

        let obj: CalendarDateType;
        if (row == 0 && i < startDay)
            obj = {date: gridStart++, month: prevMonth.month, year: prevMonth.year};
        else if (i < startDay + dayCount)
            obj = {date: i - startDay + 1, month, year};
        else
            obj = {date: i - (startDay + dayCount) + 1, month: nextMonth.month, year: nextMonth.year}
        
        if (grid[row] === undefined)
            grid[row] = [];
        grid[row][col] = obj;
    }
    return grid;
}

export const getName = (month: number): string => 
    ['January', 'February', 'March', 'April', 'May', 'Jun', 'July', 'August', 'September', 'October', 'November', 'December'][month - 1];