import { FunctionComponent } from 'react';
import { TextValue, TextFormat } from '@based/text';
import { Color } from '@based/theme';
export declare type ScatterProps = {
    data: {
        time: number;
        points: {
            x: number;
            y: number;
            label: string;
            color: Color;
            info?: {
                [key: string]: string | number;
            };
        }[];
    }[];
    xLabel?: TextValue;
    yLabel?: TextValue;
    info?: {
        [key: string]: {
            format: TextFormat;
            label: TextValue;
        };
    };
    xLabelFormat?: TextFormat;
    yLabelFormat?: TextFormat;
    header?: TextValue;
};
declare const Scatter: FunctionComponent<ScatterProps>;
export { Scatter };
