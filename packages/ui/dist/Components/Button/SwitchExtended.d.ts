import { FunctionComponent, CSSProperties } from 'react';
import { Color } from '@based/theme';
import { OnValueChange } from '../../types';
import { TextValue } from '@based/text';
export declare type SwitchExtendedProps = {
    onChange: OnValueChange<boolean>;
    value?: boolean;
    style?: CSSProperties;
    identifier?: any;
    info?: TextValue;
    label?: TextValue;
    color?: Color;
    noBorder?: boolean;
};
export declare const SwitchExtended: FunctionComponent<SwitchExtendedProps>;
