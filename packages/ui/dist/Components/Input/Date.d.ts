import { CSSProperties, FunctionComponent } from 'react';
import { Color } from '@based/theme';
import { OnValueChange } from '../../types';
declare type DateInputProps = {
    border?: boolean;
    weight?: 'semibold' | 'medium' | 'regular';
    style?: CSSProperties;
    value?: string | number;
    identifier?: any;
    color?: Color;
    onChange: OnValueChange<number | undefined>;
    noBackground?: boolean;
    noHover?: boolean;
};
export declare const DateInput: FunctionComponent<DateInputProps>;
export {};
