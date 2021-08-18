import { PropsWithChildren, FunctionComponent } from 'react';
import { IconName } from '@based/icons';
import { ButtonProps } from '../Button';
import { OnClose } from '.';
import { TextValue } from '@based/text';
export declare type ModalHeaderProps = PropsWithChildren<{
    closeButton?: boolean;
    title?: TextValue;
    onEditTitle?: (value: string) => void;
    onClose?: OnClose;
    icon?: IconName;
    framed?: boolean;
    noBorder?: boolean;
}>;
export declare type ConfirmButton = ButtonProps;
export declare type ModalProps = {
    onClose?: OnClose;
    height?: number | 'string';
    width?: number | 'string';
    header?: ModalHeaderProps | ((props: object) => ModalHeaderProps);
    confirmButton?: ConfirmButton | ((props: object) => ConfirmButton);
};
export declare const ModalHeader: FunctionComponent<ModalHeaderProps>;
export declare const Modal: FunctionComponent<ModalProps>;
