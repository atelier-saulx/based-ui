import { CSSProperties, FunctionComponent } from 'react';
import { Color } from '@based/theme';
import { OnValueChange } from '../../types';
declare type TimeInputProps = {
    border: boolean;
    weight?: 'semibold' | 'medium' | 'regular';
    style?: CSSProperties;
    color?: Color;
    value?: string | number;
    identifier?: any;
    onChange: OnValueChange<number | undefined>;
    useSeconds?: boolean;
    noBackground?: boolean;
    noHover?: boolean;
};
/**
 * Time inpuut field
 * WARNING: Accepts and returns miliseconds.
 * If milliseconds are used as timestamp to a Date object it will add local timezone offset
 * when getting or viewing value.
 * UTC functions must be used when setting or getting hours/minustes/seconds:
 * setUTCHours(), getUTC*(), toUTCString()
 */
export declare const TimeInput: FunctionComponent<TimeInputProps>;
export {};
