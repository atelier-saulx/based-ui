import { FunctionComponent, CSSProperties } from 'react';
import { Color } from '@based/theme';
import { IconName, IconProps } from '@based/icons';
import { GenericOverlayProps } from './GenericOverlay';
import { TextValue } from '@based/text';
import { DataEventHandler } from '../../types';
export declare type NextProps = {
    label?: TextValue;
};
export declare type ContextualMenuItemProps = {
    icon?: IconName;
    label?: TextValue;
    onClick?: DataEventHandler;
    style?: CSSProperties;
    color?: Color;
    border?: boolean;
    iconProps?: IconProps;
    onOptions?: DataEventHandler;
    optionsIcon?: IconName;
    weight?: 'semibold' | 'medium' | 'regular';
    Icon?: FunctionComponent<IconProps>;
};
export declare const ContextualMenuItem: FunctionComponent<ContextualMenuItemProps>;
export declare const Menu: FunctionComponent<GenericOverlayProps>;
