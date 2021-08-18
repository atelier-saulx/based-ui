import { CSSProperties, FunctionComponent } from 'react';
import { Color } from '@based/theme';
declare type OrderLabelProps = {
    style?: CSSProperties;
    index: number;
    color?: Color;
    Icon: any;
};
export declare const OrderLabel: FunctionComponent<OrderLabelProps>;
export {};
