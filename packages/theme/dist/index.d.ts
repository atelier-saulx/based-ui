import './style.css';
import './font/style.css';
export declare type Rgb = [number, number, number];
export declare type ColorKey = 'primary' | 'primaryAccent' | 'secondary' | 'secondaryAccent' | 'background' | 'foreground' | 'divider' | 'error';
export declare type Colors = {
    primary: Rgb[];
    primaryAccent: Rgb[];
    secondary: Rgb[];
    secondaryAccent: Rgb[];
    background: Rgb[];
    foreground: Rgb[];
    divider: Rgb[];
    error: Rgb[];
};
export declare type Theme = {
    light: Colors;
    dark: Colors;
};
export declare type Listener = () => void;
export declare type ThemeWrapper = {
    theme: Theme;
    listeners: Listener[];
    active: 'light' | 'dark';
};
declare const theme: ThemeWrapper;
export declare const hashTheme: (theme: ThemeWrapper) => string;
export declare const useTheme: (active?: 'light' | 'dark') => string;
export declare type Color = {
    color: ColorKey;
    tone?: number;
    opacity?: number;
};
export declare const useColor: (color: Color) => string;
export declare const getTheme: (label?: string) => Colors;
export declare const getTone: () => string;
export declare const updateTheme: (update: {
    dark?: Colors;
    light?: Colors;
}) => void;
export declare const switchTheme: (label: 'dark' | 'light') => void;
export default theme;
