import { FunctionComponent, CSSProperties } from 'react';
import { Color } from '@based/theme';
import '@compiled/react';
declare type LoaderProps = {
    style?: CSSProperties;
    size?: number;
    color?: Color;
    delay?: number;
    fadeIn?: boolean;
};
export declare const Loader: FunctionComponent<LoaderProps>;
export {};
