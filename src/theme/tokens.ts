export type ColorTokens = {
    background: string,
    surface: string,
    decoration: string,
    accent: string,
    accentLight: string,
    accentDark: string,
    mainText: string,
    mutedText: string,
    disabled: string,
}

const light: ColorTokens = {
    background: '#F7F8FA',
    surface: '#FFFFFF',
    decoration: '#E9ECF1',
    accent: '#9B36F5',
    accentLight: '#B14CFF',
    accentDark: '#7E2DC7',
    mainText: '#1B1E21',
    mutedText: '#5F6368',
    disabled: '#C6C6C6',
};


const dark: ColorTokens = {
    background: '#1B1E21',
    surface: '#26292C',
    decoration: '#313437',
    accent: '#9B36F5',
    accentLight: '#B14CFF',
    accentDark: '#7E2DC7',
    mainText: '#E4E4E4',
    mutedText: '#A0A0A0',
    disabled: '#5E5E5E',
};

export const colors = {light, dark}