import { ColorModeType, ColorSchemeType } from "../types";

const black = "#000000";
const white = "#FFFFFF";

const darkMode: ColorModeType = {
    backgroundC: '#1A1B25',
    textC: '#E0E0E0',
    lowContrast: '#2E2F50',
    highContrast: '#CECFEE',
    midTone: '#6E6E6E',
}

const lightMode: ColorModeType = {
    backgroundC: '#F0F0FE',
    textC: '#1A1B25',
    lowContrast: '#CECFEE',
    highContrast: '#2E2F50',
    midTone: '#6E6E6E',
}

export const darkModeColorScheme: ColorSchemeType = {
    backgroundC: darkMode.backgroundC,    
    drawerBgC: black,
    drawerIconC: darkMode.highContrast,
    headerC: darkMode.lowContrast,
    separatorLineC: darkMode.lowContrast,
    textC: darkMode.textC,    
}

export const lightModeColorScheme: ColorSchemeType = {
    backgroundC: lightMode.backgroundC,
    drawerBgC: white,
    drawerIconC: lightMode.highContrast,
    headerC: lightMode.lowContrast,
    separatorLineC: lightMode.lowContrast,
    textC: lightMode.textC,
}