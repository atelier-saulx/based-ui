import { FunctionComponent } from 'react';
import { TextValue } from '@based/text';
export declare type BarGraphProps = {
    data: {
        value: number | {
            [key: string]: number;
        };
        label: TextValue;
    }[];
    label?: TextValue;
    legend?: {
        [key: string]: TextValue;
    };
    value?: TextValue;
};
declare const BarGraph: FunctionComponent<BarGraphProps>;
export { BarGraph };
