import { FunctionComponent, EventHandler, SyntheticEvent } from 'react';
import { Color } from '@based/theme';
import { IconName } from '@based/icons';
import { TextValue } from '@based/text';
import { AsyncEvent } from '../../types';
declare type GenericEventHandler = EventHandler<SyntheticEvent>;
export declare const Card: FunctionComponent<{
    icon: IconName;
    onClick?: AsyncEvent | GenericEventHandler;
    label?: TextValue;
    width?: number;
    onHover?: GenericEventHandler;
    frameColor?: Color;
    children?: TextValue;
}>;
export {};
