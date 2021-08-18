import { IconName } from '@based/icons';
import { DataEventHandler, Data, ExportData, File, Children } from '../../../types';
import { HeaderProps, FooterProps, SequenceitemProps, OptionsComponentProps } from '../types';
import { ComponentType } from 'react';
export declare type FlowProps = {
    indicator?: boolean;
    onDropData?: DataEventHandler;
    onDropFile?: DataEventHandler;
    onDrop?: DataEventHandler<{
        data: Data[];
        targetIndex: number;
        targetData: Data;
    } | {
        files: File[];
        targetIndex: number;
        targetData: Data;
    }>;
    onDropSequence?: DataEventHandler<{
        data: Data[];
        targetIndex: number;
    } | {
        files: File[];
        targetIndex: number;
    }>;
    paddingRight?: number;
    paddingLeft?: number;
    sequenceSpacing?: number;
    paddingTop?: number;
    expandable?: boolean;
    defaultIsExpanded?: boolean;
    paddingBottom?: number;
    items: Object[];
    draggable?: boolean;
    Actions?: ComponentType<OptionsComponentProps>;
    itemProps?: SequenceitemProps;
    onClick?: DataEventHandler;
    actionIcon?: IconName;
    onAction?: DataEventHandler;
    footer?: FooterProps;
    stepFooter?: FooterProps;
    exportData?: ExportData;
    exportDataSequence?: ExportData;
    onOptions?: DataEventHandler;
    optionsIcon?: IconName;
    contextualMenu?: boolean;
    children?: Children<OptionsComponentProps>;
    header?: HeaderProps;
};
