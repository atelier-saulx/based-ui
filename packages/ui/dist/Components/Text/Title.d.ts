import { CSSProperties, FunctionComponent } from 'react';
import { Color } from '@based/theme';
import { TextValue } from '@based/text';
declare type TitleProps = {
    style?: CSSProperties;
    color?: Color;
    noSelect?: boolean;
    children?: TextValue;
    singleLine?: boolean;
    size?: 'regular' | 'small' | 'large';
};
export declare const Title: FunctionComponent<TitleProps>;
export {};
