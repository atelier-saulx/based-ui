import { RefObject } from 'react';
export declare type Align = 'flex-start' | 'center' | 'flex-end';
export declare type Target = (Element | Node) & {
    rect?: ClientRect;
};
export declare type PosCalculation<T = number> = ((targetRect: ClientRect, elementRect: ClientRect, align: Align) => T) | T;
export declare type MaxMinCalculation<T = number> = ((value: T, elementRect: ClientRect, align: Align, targetRect: ClientRect, position: Position) => T) | T;
export declare type SelectTarget = (t: Target) => Target;
export declare type PositionProps = {
    selectTarget?: SelectTarget;
    width?: PosCalculation<string | number>;
    x?: PosCalculation;
    y?: PosCalculation;
    maxY?: MaxMinCalculation;
    maxX?: MaxMinCalculation;
    align?: Align;
};
export declare type PositionPropsFn = PositionProps & {
    target: Target;
};
export declare type PositionPropsFnOptional = PositionProps & {
    target?: Target;
};
export declare type Position = {
    containerWidth?: number;
    y?: number;
    x?: number;
    bottom?: number;
    width?: number | string;
    spaceOnTop?: boolean;
    correctedY?: number;
    elementRect?: ClientRect;
    targetRect?: ClientRect;
    minWidth?: number | string;
};
export declare type Resize = () => void;
declare const _default: ({ target, selectTarget, width, x, y, maxY, maxX, align, }: PositionPropsFn) => [
    RefObject<HTMLDivElement>,
    Position | undefined,
    Resize
];
export default _default;
