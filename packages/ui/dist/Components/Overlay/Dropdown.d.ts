import { ComponentType, FunctionComponent, PropsWithChildren } from 'react';
import { PositionPropsFn } from '../../hooks/overlay/useOverlayPosition';
import { IconName } from '@based/icons';
import { TextValue } from '@based/text';
import { Data, OnValueChange } from '../../types';
export declare type DropdownOption = {
    icon?: IconName;
    value: TextValue;
    framed?: boolean;
    data?: Data;
    action?: boolean;
    id?: string;
    children?: TextValue | ComponentType<PropsWithChildren<OptionProps>>;
};
export declare type OptionProps = {
    option: DropdownOption;
    isActive: boolean;
    onChange: OnValueChange;
    index: number;
};
export declare type DropdownProps = {
    items: DropdownOption[];
    onChange: OnValueChange<DropdownOption>;
    value?: DropdownOption | DropdownOption[];
    filter?: boolean;
};
export declare const dropdownOptionIsEqual: (a: DropdownOption, b: DropdownOption) => boolean;
export declare const Dropdown: FunctionComponent<PositionPropsFn & DropdownProps>;
