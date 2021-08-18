import React, { EventHandler, SyntheticEvent } from 'react';
import { Data } from '../types';
export declare type SelectableContext<T> = {
    data: Data<T>[];
    children: {
        [key: string]: (...args: any[]) => void;
    };
    selection: Set<Data<T>>;
};
export declare const SelectionContext: React.Context<SelectableContext<{}>>;
export declare const SelectableCollection: ({ children, items }: {
    children: any;
    items: any;
}) => JSX.Element;
export declare const selection: Map<Data, any[]>;
export declare const getSelection: () => {
    data: any;
    index?: number;
    exportData?: import("../types").ExportData<any>;
}[];
export declare const useSelection: () => {
    data: any;
    index?: number;
    exportData?: import("../types").ExportData<any>;
}[];
export declare const clearSelection: () => void;
export declare const useClick: (onClick: EventHandler<SyntheticEvent>, refs?: any[]) => (e: any) => void;
declare type SelectEvents = {
    onMouseDown: EventHandler<SyntheticEvent>;
};
export declare function useSelect<T = any>(data: Data<T>): [SelectEvents, boolean];
export {};
