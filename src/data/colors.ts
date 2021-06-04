import { ColorModeType, ColorSchemeType } from "../types";

const darkMode: ColorModeType = {
    accent: '#99E8D4',
    backgroundC: '#1A1B25',
    secondaryBgC: '#2A2B35',
    dTextC: '#A0A0C0',
    textC: '#E0E0E0',
    lowContrast: '#2E2F50',
    highContrast: '#CECFEE',
    midTone: '#5E5F7E',
}

const lightMode: ColorModeType = {
    accent: '#1E8F71',
    backgroundC: '#F0F0FE',
    secondaryBgC: '#F5F5FF',
    dTextC: '#7A7B90',
    textC: '#1A1B25',
    lowContrast: '#CECFEE',
    highContrast: '#2E2F50',
    midTone: '#5E5F7E',
}

export const darkModeColorScheme: ColorSchemeType = {
    accent: darkMode.accent,
    backgroundC: darkMode.backgroundC,
    drawerIconC: darkMode.highContrast,
    dTextC: darkMode.dTextC,
    headerC: darkMode.lowContrast,
    modalBgC: darkMode.secondaryBgC,
    recordBgC: darkMode.secondaryBgC,
    recordBtnC: darkMode.midTone,
    separatorLineC: darkMode.midTone,
    textC: darkMode.textC,    
}

export const lightModeColorScheme: ColorSchemeType = {
    accent: lightMode.accent,
    backgroundC: lightMode.backgroundC,
    drawerIconC: lightMode.highContrast,
    dTextC: lightMode.dTextC,
    headerC: lightMode.lowContrast,
    modalBgC: lightMode.secondaryBgC,
    recordBgC: lightMode.secondaryBgC,
    recordBtnC: lightMode.lowContrast,
    separatorLineC: lightMode.lowContrast,
    textC: lightMode.textC,
}