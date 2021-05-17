import { ColorModeType, ColorSchemeType } from "../types";

const black = "#000000";
const white = "#FFFFFF";

const darkMode: ColorModeType = {
    backgroundC: '#1A1B25',
    secondaryBgC: '#2A2B35',
    textC: '#E0E0E0',
    lowContrast: '#2E2F50',
    highContrast: '#CECFEE',
    midTone: '#5E5F7E',
}

const lightMode: ColorModeType = {
    backgroundC: '#F0F0FE',
    secondaryBgC: '#F5F5FF',
    textC: '#1A1B25',
    lowContrast: '#CECFEE',
    highContrast: '#2E2F50',
    midTone: '#5E5F7E',
}

export const darkModeColorScheme: ColorSchemeType = {
    backgroundC: darkMode.backgroundC,    
    drawerBgC: black,
    drawerIconC: darkMode.highContrast,
    headerC: darkMode.lowContrast,
    recordBgC: darkMode.secondaryBgC,
    recordBtnC: darkMode.midTone,
    separatorLineC: darkMode.lowContrast,
    textC: darkMode.textC,    
}

export const lightModeColorScheme: ColorSchemeType = {
    backgroundC: lightMode.backgroundC,
    drawerBgC: white,
    drawerIconC: lightMode.highContrast,
    headerC: lightMode.lowContrast,
    recordBgC: lightMode.secondaryBgC,
    recordBtnC: lightMode.lowContrast,
    separatorLineC: lightMode.lowContrast,
    textC: lightMode.textC,
}