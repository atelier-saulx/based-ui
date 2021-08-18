import { CSSProperties, FunctionComponent } from 'react';
import { Color } from '@based/theme';
import { TextValue } from '@based/text';
declare type TextProps = {
    style?: CSSProperties;
    color?: Color;
    children?: TextValue;
    noSelect?: boolean;
    singleLine?: boolean;
    overflow?: boolean;
    weight?: 'regular' | 'medium' | 'semibold';
};
export declare const Text: FunctionComponent<TextProps>;
export {};
