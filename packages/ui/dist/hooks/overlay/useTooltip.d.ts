import { OnClose } from '../../Components/Overlay';
import { PositionPropsFnOptional } from './useOverlayPosition';
import { PropsWithChildren, ReactChild, ReactChildren } from 'react';
import { DataEventHandler } from '../../types';
import { TextValue } from '@based/text';
export declare type TooltipEvents = {
    onMouseEnter: DataEventHandler;
};
export default function useTooltip(children: ReactChild | ReactChildren[] | TextValue, props?: PropsWithChildren<PositionPropsFnOptional & {
    initialTimer?: number;
}>, handler?: (selection: Event | any) => OnClose | undefined): TooltipEvents;
