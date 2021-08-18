import { FunctionComponent } from 'react';
import { TextValue } from '@based/text';
declare type ModalTitleProps = {
    value: TextValue;
    placeholder?: TextValue;
    identifier?: any;
    onEditTitle?: (value: string) => void;
    autoFocus?: boolean;
};
export declare const ModalTitle: FunctionComponent<ModalTitleProps>;
export {};
