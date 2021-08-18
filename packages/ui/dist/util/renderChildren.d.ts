import { ReactChildren, ReactChild, ReactText, PropsWithChildren } from 'react';
import { Children } from '../types';
export declare type Child = ReactChild | ReactChildren | ReactText | ReactText[];
declare function renderChildren<T = PropsWithChildren<any>>(children: Children, props?: T): Child;
export default renderChildren;
