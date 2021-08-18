import { CSSProperties, FunctionComponent } from 'react';
import { Color } from '@based/theme';
export declare type RadioProps = {
    onChange?: (value: boolean | void) => void;
    value?: boolean;
    overrideValue?: boolean;
    style?: CSSProperties;
    color?: Color;
};
export declare const Radio: FunctionComponent<RadioProps>;
