import { ColorModeType, ColorSchemeType } from "../types";

const darkMode: ColorModeType = {
    backgroundC: '#1A1B25',
    textC: '#E0E0E0',
    lowContrast: '#2E2E2E',
    highContrast: '#AEAEAE',
    midTone: '#6E6E6E',
}

const lightMode: ColorModeType = {
    backgroundC: '#E0E0E0',
    textC: '#1A1B25',
    lowContrast: '#AEAEAE',
    highContrast: '#2E2E2E',
    midTone: '#6E6E6E',
}

export const darkModeColorScheme: ColorSchemeType = {
    backgroundC: darkMode.backgroundC,
    textC: darkMode.textC,
    separatorLines: darkMode.lowContrast,
}

export const lightModeColorScheme: ColorSchemeType = {
    backgroundC: lightMode.backgroundC,
    textC: lightMode.textC,
    separatorLines: lightMode.lowContrast,
}