import { TextValue } from '@based/text';
import { SyntheticEvent, ReactChild, ReactChildren, ComponentType, ReactText, PropsWithChildren, ReactNode } from 'react';
export declare type File = {
    content: any;
    mime: string;
    name: string;
};
export declare type Data<T = {}> = T & {
    data: any;
    index?: number;
    exportData?: ExportData;
};
export declare type DataEventHandler<T = {}> = (e: Event | SyntheticEvent, data?: Data<T>) => void | Promise<void> | boolean | Promise<boolean>;
export declare type AsyncEvent = (e: Event | SyntheticEvent) => void | Promise<void>;
export declare type MultiDataEventHandler<T = {}> = (e: Event | SyntheticEvent, data?: Data<T>[]) => void | Promise<void>;
export declare type OnValueChange<T = any> = (value: T, index?: number) => void;
export declare type Timestamp = number;
export declare type ExportedData = {
    file?: {
        value: any;
        name: string;
        mime: string;
    };
    text?: TextValue;
};
export declare type Children<T = PropsWithChildren<any>> = ReactChild | ReactChildren | ComponentType<T> | ReactText | ReactText[] | ReactNode | ReactNode[] | number | string | number[] | string[];
export declare type ExportData<T = any> = (data: Data<T>) => Promise<ExportedData>;
