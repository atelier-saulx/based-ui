import { ComponentType } from 'react';
declare const isComponent: (children: any) => children is ComponentType<{}>;
export default isComponent;
