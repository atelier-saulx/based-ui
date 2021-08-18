import { CSSProperties, FunctionComponent } from 'react';
import { Color } from '@based/theme';
export declare type CheckProps = {
    onChange?: (value: boolean | void) => void;
    value?: boolean;
    overrideValue?: boolean;
    style?: CSSProperties;
    color?: Color;
    disabledColor?: Color;
};
export declare const Check: FunctionComponent<CheckProps>;
