import { RefObject } from 'react';
export declare type Key = 'Enter' | 'Esc' | 'ArrowUp' | 'ArrowDown' | 'ArrowLeft' | 'ArrowRight' | 'Tab';
declare class TempEvent {
    constructor(target: EventTarget | Element);
    pageX: number;
    pageY: number;
    which: string;
    current: EventTarget | Element;
    currentTarget: EventTarget | Element;
    preventDefault(): void;
    stopPropagation(): void;
}
export declare const matchKeyCode: (k: Key | Number, e: KeyboardEvent) => boolean;
export declare const useKeyUp: (handler: (event: TempEvent) => void, ref: RefObject<Element>, keycodes: (Key | number)[]) => void;
export declare const useKeyDown: (handler: (event: TempEvent) => void, ref: RefObject<Element>, keycodes: (Key | number)[]) => void;
export {};
