import { IconName } from '@based/icons';
import { DataEventHandler, ExportData, File, Data } from '../../../types';
import { HeaderProps, CollectionitemProps, OptionsComponentProps, FooterProps } from '../types';
export declare type GridProps = {
    header?: HeaderProps;
    footer?: FooterProps;
    itemProps?: CollectionitemProps;
    items: Object[];
    large?: boolean;
    optionsIcon?: IconName;
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
    framed?: boolean;
    Graphic?: OptionsComponentProps;
    activeId?: string | number;
    forceActive?: boolean;
    contextualMenu?: boolean;
};
