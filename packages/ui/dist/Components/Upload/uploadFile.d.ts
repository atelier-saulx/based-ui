import { CreateProgressContextProps } from './ProgressContext';
export declare type UploadFileScript = (files: FileList, progressContext: CreateProgressContextProps, progressId: string, type?: 'file' | 'video', fake?: boolean) => Promise<void>;
export declare const uploadFile: UploadFileScript;
