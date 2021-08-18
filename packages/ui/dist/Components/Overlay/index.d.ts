import { ReactNode } from 'react';
import { notify } from './useNotifications';
export declare type OnClose = () => void;
export declare type OverlayOptions = {
    overlay?: boolean;
    transparent?: boolean;
};
export declare type Overlays = [ReactNode, OnClose, OverlayOptions][];
declare const Overlay: () => JSX.Element;
declare const addOverlay: (overlay: ReactNode, onClose?: OnClose, options?: OverlayOptions) => void;
declare const removeAllOverlays: () => void;
declare const removeOverlay: (overlay?: ReactNode) => void;
export { Overlay, addOverlay, removeOverlay, removeAllOverlays, notify };
