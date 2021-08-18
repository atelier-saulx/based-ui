import { CSSProperties, ComponentType, FunctionComponent } from 'react';
import { Color } from '@based/theme';
import { IconName } from '@based/icons';
import { Validator } from './validators';
import './style.css';
import { DropdownOption } from '../Overlay/Dropdown';
import { TextValue } from '@based/text';
import { OnSelect } from '../../hooks/overlay/useDropdown';
declare type SelectInputProps = {
    style?: CSSProperties;
    placeholder?: TextValue;
    border?: boolean;
    autoFocus?: boolean;
    onChange: OnSelect;
    filter?: boolean;
    validator?: Validator;
    Label?: ComponentType<{
        value: DropdownOption | DropdownOption[];
        placeholder?: TextValue;
    }>;
    icon?: IconName;
    identifier?: any;
    multi?: boolean;
    value?: DropdownOption | DropdownOption[];
    items?: DropdownOption[];
    color?: Color;
    weight?: 'semibold' | 'medium' | 'regular';
};
export declare const Select: FunctionComponent<SelectInputProps>;
export {};
