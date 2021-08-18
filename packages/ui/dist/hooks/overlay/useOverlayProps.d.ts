/// <reference types="node" />
import React, { RefObject, PropsWithChildren } from 'react';
export declare class OverlayCtx<P> {
    props: PropsWithChildren<P>;
    timer: NodeJS.Timeout;
    update(props: PropsWithChildren<P>): void;
    merge(props: Object): void;
    listeners: Set<(props: PropsWithChildren<P>) => void>;
}
export declare const OverlayContext: React.Context<React.RefObject<OverlayCtx<any>>>;
export declare function createOverlayContextRef<P>(props: PropsWithChildren<P>): RefObject<OverlayCtx<P>>;
declare type Props = PropsWithChildren<any>;
export default function useOverlayProps<P = Props>(p?: P): P;
export {};
