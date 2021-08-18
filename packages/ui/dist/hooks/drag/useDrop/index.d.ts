import { DragEventHandler, DragEvent } from 'react';
import { Data, File } from '../../../types';
declare type DropEventHandler = (e: DragEvent, parsedData: {
    files?: File[];
    data?: Data[];
}) => void;
declare type DropEvents = {
    onDragEnter: DragEventHandler;
    onDragOver: DragEventHandler;
    onDrop: DragEventHandler;
    onDragLeave: DragEventHandler;
};
declare type DropProps = {
    validate?: (e?: DragEvent) => boolean;
    readFiles?: boolean;
};
declare const useDrop: (onDrop?: DropEventHandler, props?: DropProps) => [DropEvents, boolean, boolean];
export default useDrop;
