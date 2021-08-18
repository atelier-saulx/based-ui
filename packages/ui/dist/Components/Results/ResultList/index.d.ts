import { CSSProperties, FunctionComponent } from 'react';
import { TextValue } from '@based/text';
import { ResultListItemProps } from '../../Collection/types';
export declare type ResultListProps = {
    items: any[];
    itemProps?: ResultListItemProps;
    label?: TextValue;
    value?: TextValue;
    style?: CSSProperties;
};
declare const ResultList: FunctionComponent<ResultListProps>;
export { ResultList };
