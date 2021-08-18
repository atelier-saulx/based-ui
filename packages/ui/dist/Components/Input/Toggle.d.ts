import { FunctionComponent, CSSProperties } from 'react';
import { TextValue } from '@based/text';
import { OnValueChange } from '../../types';
import { IconName } from '@based/icons';
export declare type ToggleInputProps = {
    style?: CSSProperties;
    onChange: OnValueChange<boolean>;
    value?: boolean;
    icon?: IconName;
    border?: boolean;
    identifier?: any;
    children?: TextValue;
};
export declare const CheckBox: FunctionComponent<ToggleInputProps>;
export declare const RadioButton: FunctionComponent<ToggleInputProps>;
