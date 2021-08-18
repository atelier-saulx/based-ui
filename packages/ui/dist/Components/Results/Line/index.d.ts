import React, { FunctionComponent } from 'react';
import { TextValue, TextFormat } from '@based/text';
declare type Data = {
    x: number;
    y: number;
}[];
declare type Ctx = {
    hover?: (key: string) => void;
};
export declare const GraphContext: React.Context<Ctx>;
export declare type LineGraphProps = {
    data: {
        [key: string]: Data;
    } | Data;
    legend?: {
        [key: string]: TextValue;
    };
    format?: 'date' | 'number' | 'date-time-human';
    valueFormat?: TextFormat;
    spread?: boolean;
    label?: TextValue;
};
declare const LineGraph: FunctionComponent<LineGraphProps>;
export { LineGraph };
