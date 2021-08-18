import { TextValue } from '@based/text';
import { Color } from '@based/theme';
import { CSSProperties } from 'react';
import { DataEventHandler, OnValueChange } from '../../../types';
declare type TabSize = {
    width: number;
    x: number;
};
export declare type TabSizes = TabSize[];
declare type TabConfig = {
    title: TextValue;
    onClick?: DataEventHandler;
    to?: string;
    border?: boolean;
};
export declare type TabProps = {
    tab: TabConfig;
    onClick?: DataEventHandler;
    activeTab: number;
    index: number;
    tabSizes: TabSizes;
    indicatorMargin?: number;
    noIndicator?: boolean;
};
export declare type TabsProps = {
    onChange?: OnValueChange;
    active?: number;
    tabs: TabConfig[];
    style?: CSSProperties;
    noIndicator?: boolean;
    noBorder?: boolean;
    indicatorMargin?: number;
    color?: Color;
};
export {};
