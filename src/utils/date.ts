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

export const genCalendar = (year: number, month: number): Array<Array<CalendarDateType>> => {
    let startDay: number = moment(`${year}-${insertZeros(month.toString(), 2)}-01`).weekday();
    let dayCount: number = getDateNo(year, month);
    let cellCount: number = Math.ceil((startDay + dayCount) / 7) * 7;

    let prevMonth: number = Math.floor(1 / month) * 12 + month - 1;
    let gridStart: number = getDateNo(year, prevMonth) - startDay + 1;

    let grid: Array<Array<CalendarDateType>> = [];
    let row: Array<CalendarDateType> = [];
    let dayCounter: number = 0;

    for (let i = 0; i < cellCount; ++i) {
        if (i % 7 == 0 && i != 0) {
            grid.push(row);
            row = [];
        }

        if (i < startDay)
            row.push({
                date: gridStart++,
                month: prevMonth,
            });
        else {
            row.push({
                date: ++dayCounter,
                month,
            });

            if (dayCounter >= dayCount) {
                dayCounter = 0;
                month = month % 12 + 1;
            }
        }
    }
    grid.push(row);
    return grid;
}