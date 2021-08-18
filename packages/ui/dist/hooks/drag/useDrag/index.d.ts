import { RefObject, CSSProperties, DragEventHandler } from 'react';
import { Data } from '../../../types';
export declare const isDragging: () => boolean;
declare type DragEvents = {
    draggable: true;
    onDragStart: DragEventHandler;
    current?: true;
    ref?: RefObject<HTMLElement>;
};
export declare type Drag = [DragEvents, boolean];
export declare type DragProps = {
    modifyImageElement?: (el: HTMLElement) => void;
    style?: CSSProperties;
};
declare function useDrag<T>(data: Data<T>, ref?: RefObject<HTMLElement>, props?: DragProps): Drag;
export default useDrag;
