/// <reference types="react" />
import { TextValue } from '@based/text';
declare type Notification = {
    message?: TextValue;
    title: TextValue;
    time?: number;
    type?: 'error' | 'info';
    id: number;
    y: number;
    deleting?: boolean;
    starting?: boolean;
};
export declare const notify: (payload: Notification) => void;
export declare const useNotifications: ({ update }: {
    update: any;
}) => JSX.Element;
declare const Notification: ({ value, i }: {
    value: any;
    i: any;
}) => JSX.Element;
export {};
