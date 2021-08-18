import { IconName } from '@based/icons';
import { DataEventHandler, ExportData, File, Data, OnValueChange } from '../../../types';
import { FunctionComponent } from 'react';
import { TableitemProps, OptionsComponentProps } from '../types';
export declare type FieldsViewUpdate = {
    sort?: {
        field: number;
        order: 'desc' | 'asc';
    };
    filter?: string;
};
export declare type TableProps = {
    draggable?: boolean;
    itemProps: TableitemProps;
    large?: boolean;
    paddingLeft?: number;
    paddingRight?: number;
    items?: Object[];
    onScroll?: (e: {
        scrollOffset: number;
    }, height: number) => void;
    forceActive?: boolean;
    exportData?: ExportData;
    onOptions?: DataEventHandler;
    onDrop?: DataEventHandler<{
        data: Data[];
        targetIndex?: number;
    } | {
        files: File[];
        targetIndex?: number;
    }>;
    onClick?: DataEventHandler;
    activeId?: string | number;
    optionsIcon?: IconName;
    contextualMenu?: boolean;
    Options?: FunctionComponent<OptionsComponentProps>;
    actionIcon?: IconName;
    onChange?: OnValueChange<FieldsViewUpdate>;
    onAction?: DataEventHandler;
};
