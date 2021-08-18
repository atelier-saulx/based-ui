import { CSSProperties, FunctionComponent } from 'react';
import { Color } from '@based/theme';
import { TextValue } from '@based/text';
declare type TitleProps = {
    style?: CSSProperties;
    color?: Color;
    noSelect?: boolean;
    singleLine?: boolean;
    children?: TextValue;
};
export declare const SubText: FunctionComponent<TitleProps>;
export {};
