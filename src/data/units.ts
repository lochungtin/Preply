import { UnitMatrixType } from '../types';
import { DistanceUnits, TemperatureUnits, WeightUnits, } from '../types/unitTypes';

const self = (num: number): number => num;

const pow3 = (num: number): number => num * 1000;

const ipw3 = (num: number): number => num / 1000;

export const distanceMatrix: UnitMatrixType = {
    labels: [
        DistanceUnits.mm,
        DistanceUnits.cm,
        DistanceUnits.m,
        DistanceUnits.km,
        DistanceUnits.inch,
        DistanceUnits.feet,
        DistanceUnits.yard,
        DistanceUnits.mile,
    ],
    matrix: [
        [ // from mm
            self,
            n => n / 10,
            ipw3,
            n => n / 1000000,
            n => n / 25.4,
            n => n / 305,
            n => n / 914,
            n => n / 1609340,
        ],
        [ // from cm
            n => n * 10,
            self,
            n => n / 100,
            n => n / 100000,
            n => n / 2.54,
            n => n / 30.84,
            n => n / 91.44,
            n => n / 160934,
        ],
        [ // from m
            pow3,
            n => n * 100,
            self,
            ipw3,
            n => n * 39.37,
            n => n * 3.281,
            n => n * 1.094,
            n => n / 1609, 
        ],
        [ // from km
            n => n * 1000000,
            n => n * 100000,
            pow3,
            self,
            n => n * 39370,
            n => n * 3281,
            n => n * 1094,
            n => n / 1.609,
        ],
        [ // from inch
            n => n * 25.4,
            n => n * 2.54,
            n => n / 39.37,
            n => n / 39370,
            self,
            n => n / 12,
            n => n / 36,
            n => n / 63360,
        ],
        [ // from feet
            n => n * 304.8,
            n => n * 30.48,
            n => n / 3.281,
            n => n / 3281,
            n => n * 12,
            self,
            n => n / 3,
            n => n / 5280,
        ],
        [ // from yard
            n => n * 9144,
            n => n * 91.44,
            n => n / 1.094,
            n => n / 1094,
            n => n * 36,
            n => n * 3,
            self,
            n => n / 1760,
        ],
        [ // from mile
            n => n * 1609340,
            n => n * 160934,
            n => n * 1609,
            n => n * 1.609,
            n => n * 63360,
            n => n * 5280,
            n => n * 1760,
            self,
        ],
    ]
}

export const temperatureMatrix: UnitMatrixType = {
    labels: [
        TemperatureUnits.C,
        TemperatureUnits.F,
    ],
    matrix: [
        [ // from C
            self, 
            n => (n * 9 / 5) + 32,
        ],
        [ // from F
            n => (n - 32) * 5 / 9, 
            self,
        ],
    ],
}

export const weightMatrix: UnitMatrixType = {
    labels: [
        WeightUnits.g,
        WeightUnits.kg,
        WeightUnits.lb,
        WeightUnits.oz,
        WeightUnits.st,
    ],
    matrix: [
        [ // from g
            self,
            ipw3,
            n => n / 454,
            n => n / 28.35,
            n => n / 6350,
        ],
        [ // from kg
            pow3,
            self,
            n => n * 2.205,
            n => n * 35.274,
            n => n / 6.35,
        ],
        [ // from lb
            n => n * 454,
            n => n / 2.205,
            self,
            n => n * 16,
            n => n / 14,
        ],
        [ // from oz
            n => n * 28.35,
            n => n / 35.275,
            n => n / 16,
            self,
            n => n / 224,
        ],
        [ // from st
            n => n * 6350,
            n => n * 6.35,
            n => n * 14,
            n => n * 224,
            self,
        ],
    ]
}