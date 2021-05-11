import { ColorModeType, ColorSchemeType } from "../types";

const darkMode: ColorModeType = {
    backgroundC: '#1A1B25',
    textC: '#E0E0E0',
    lowContrast: '#2E2F50',
    highContrast: '#AEAEAE',
    midTone: '#6E6E6E',
}

const lightMode: ColorModeType = {
    backgroundC: '#F0F0FE',
    textC: '#2E2F50',
    lowContrast: '#CECFEE',
    highContrast: '#2E2E2E',
    midTone: '#6E6E6E',
}

export const darkModeColorScheme: ColorSchemeType = {
    backgroundC: darkMode.backgroundC,
    headerC: darkMode.lowContrast,
    separatorLineC: darkMode.lowContrast,
    textC: darkMode.textC,    
}

export const lightModeColorScheme: ColorSchemeType = {
    backgroundC: lightMode.backgroundC,
    headerC: lightMode.lowContrast,
    separatorLineC: lightMode.lowContrast,
    textC: lightMode.textC,
}