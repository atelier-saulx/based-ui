import { CSSProperties, FunctionComponent } from 'react';
import { Color } from '@based/theme';
declare type CodeProps = {
    style?: CSSProperties;
    color?: Color;
    noSelect?: boolean;
    lineNumbers?: boolean;
    lines?: {
        start: number;
        end: number;
    };
};
export declare const Code: FunctionComponent<CodeProps>;
export {};
