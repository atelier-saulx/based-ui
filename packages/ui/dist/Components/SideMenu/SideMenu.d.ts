import { FunctionComponent, CSSProperties, SyntheticEvent, ComponentType } from 'react';
import { TextValue } from '@based/text';
import { IconName } from '@based/icons';
import { Data } from '../../types';
declare type FooterProps = {
    icon: IconName;
    title: TextValue;
    type: string;
    label: TextValue;
    items?: SideMenuItemProps[];
};
export declare type SideMenuItemProps = {
    title?: TextValue;
    icon?: IconName;
    isSmall?: boolean;
    style?: CSSProperties;
    onClick?: (event: SyntheticEvent, meta: object) => {};
    active?: boolean;
    data?: Data;
    to?: string;
    type?: string;
    label?: TextValue;
    items?: SideMenuItemProps[];
    hidden?: boolean | undefined;
};
declare type SideMenuProps = {
    style?: CSSProperties;
    items: SideMenuItemProps[];
    Logo?: ComponentType<{
        isSmall?: boolean;
    }>;
    footer?: FooterProps[] | ComponentType<{
        isSmall?: boolean;
    }>;
    collapse?: number;
};
export declare const SideMenu: FunctionComponent<SideMenuProps>;
export {};
