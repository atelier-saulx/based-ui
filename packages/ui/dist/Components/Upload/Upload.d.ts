import { FunctionComponent } from 'react';
import '../Input/style.css';
import { TextValue } from '@based/text';
import { OnValueChange } from '../../types';
declare type FileUploadProps = {
    value?: string;
    onChange: OnValueChange<string>;
    identifier?: any;
    placeholder?: TextValue;
    progressId?: string;
    video?: boolean;
    fake?: boolean;
    noBackground?: boolean;
    border?: boolean;
};
export declare const FileUpload: FunctionComponent<FileUploadProps>;
export {};
