import { OnClose, OverlayOptions } from '../../Components/Overlay';
import { GenericOverlayProps } from '../../Components/Overlay/GenericOverlay';
import { PositionProps } from './useOverlayPosition';
import { ComponentType, PropsWithChildren } from 'react';
import { DataEventHandler } from '../../types';
export default function useOverlay<P, T = PropsWithChildren<any>>(component: ComponentType<P>, props?: PropsWithChildren<P & PositionProps>, handler?: (selection: Event | any) => OnClose | undefined, Overlay?: ComponentType<GenericOverlayProps & T>, options?: OverlayOptions): DataEventHandler;
