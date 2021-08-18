import { FunctionComponent, EventHandler, SyntheticEvent, CSSProperties } from 'react';
import { Color } from '@based/theme';
import { TextValue } from '@based/text';
declare type GenericEventHandler = EventHandler<SyntheticEvent>;
export declare const CardOption: FunctionComponent<{
    onChange?: (value: boolean | void) => void;
    label?: TextValue;
    onHover?: GenericEventHandler;
    value?: boolean;
    style?: CSSProperties;
    frameColor?: Color;
}>;
export {};
