import { FunctionComponent, CSSProperties } from 'react';
import { TextValue } from '@based/text';
export declare type ResultCardProps = {
    label: TextValue;
    value: string | number;
    style?: CSSProperties;
};
export declare const ResultCard: FunctionComponent<ResultCardProps>;
