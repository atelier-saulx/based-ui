import { FunctionComponent } from 'react';
import { TextValue } from '@based/text';
import { Data, DataEventHandler } from '../../../types';
export declare type JumpProps<T> = {
    items: Data<T>[];
    data: Data<T>;
    isHover?: boolean;
    label?: TextValue;
    onClick?: DataEventHandler;
};
declare const Jump: FunctionComponent<JumpProps<any>>;
export { Jump };
