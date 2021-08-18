import { FunctionComponent, CSSProperties } from 'react';
import { Color } from '@based/theme';
import { OnValueChange } from '../../types';
import { TextValue } from '@based/text';
export declare type SwitchProps = {
    color?: Color;
    onChange: OnValueChange<boolean>;
    value?: boolean;
    style?: CSSProperties;
    identifier?: any;
};
export declare const Switch: FunctionComponent<SwitchProps & {
    ignoreInternal?: boolean;
}>;
export declare const SwitchTextButton: FunctionComponent<SwitchProps & {
    enabledText?: TextValue;
    disabledText?: TextValue;
}>;
