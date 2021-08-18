import { ComponentType, FunctionComponent, PropsWithChildren } from 'react';
import { PositionPropsFn } from '../../hooks/overlay/useOverlayPosition';
import { Data } from '../../types';
export declare type GenericOverlayProps = {
    Component?: ComponentType;
} & PropsWithChildren<any & {
    data: Data;
}> & PositionPropsFn;
export declare const GenericOverlay: FunctionComponent<GenericOverlayProps>;
