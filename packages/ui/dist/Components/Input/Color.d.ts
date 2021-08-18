import { CSSProperties, FunctionComponent } from 'react';
import { Color } from '@based/theme';
import { OnValueChange } from '../../types';
import { TextValue } from '@based/text';
import './style.css';
declare type ColorInputProps = {
    style?: CSSProperties;
    placeholder?: TextValue;
    border?: boolean;
    autoFocus?: boolean;
    onChange: OnValueChange;
    identifier?: any;
    value?: string;
    color?: Color;
};
export declare const ColorInput: FunctionComponent<ColorInputProps>;
export {};
