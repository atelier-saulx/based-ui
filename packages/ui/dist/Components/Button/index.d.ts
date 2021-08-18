import { CSSProperties, FunctionComponent, EventHandler, SyntheticEvent } from 'react';
import { Color } from '@based/theme';
import { TextValue } from '@based/text';
import { IconName } from '@based/icons';
import { Key } from '../../hooks/events/useKeyboard';
import { AsyncEvent } from '../../types';
declare type GenericEventHandler = EventHandler<SyntheticEvent>;
export declare type ButtonProps = {
    style?: CSSProperties;
    color?: Color;
    foregroundColor?: Color;
    actionKeys?: Key[];
    icon?: IconName;
    iconColor?: Color;
    children?: TextValue;
    onSelectFile?: (r: {
        files: string[];
        fileList: FileList;
    }) => void;
    onClick?: GenericEventHandler | AsyncEvent;
    onHover?: GenericEventHandler;
    onMouseEnter?: GenericEventHandler;
    onContextMenu?: GenericEventHandler;
    fullWidth?: boolean;
    centered?: boolean;
    border?: boolean;
    borderColor?: Color;
};
export declare const Button: FunctionComponent<ButtonProps>;
export {};
