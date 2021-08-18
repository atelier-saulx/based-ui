import React, { CSSProperties, PropsWithChildren } from 'react';
import { Position, Align } from '../../hooks/overlay/useOverlayPosition';
export declare const InnerShared: React.ForwardRefExoticComponent<{
    width?: number | string;
    minWidth?: number | string;
    style: CSSProperties;
} & {
    children?: React.ReactNode;
} & React.RefAttributes<HTMLDivElement>>;
export declare type SharedOverlayProps = PropsWithChildren<{
    width?: number | string;
    style?: CSSProperties;
    position?: Position;
    align?: Align;
}>;
declare const _default: React.ForwardRefExoticComponent<{
    width?: string | number;
    style?: React.CSSProperties;
    position?: Position;
    align?: Align;
} & {
    children?: React.ReactNode;
} & React.RefAttributes<HTMLDivElement>>;
export default _default;
