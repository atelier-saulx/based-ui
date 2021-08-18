/// <reference types="react" />
export declare const ProgressContext: import("react").Context<CreateProgressContextProps>;
export declare type CreateProgressContextProps = {
    service: string;
    url: string;
    listeners?: Set<any>;
    items?: ProgressContextItem[];
    inProgress?: boolean;
};
export declare type ProgressContextItem = {
    xhr: XMLHttpRequest;
    size: number;
    id: string;
    name: string;
    mime: string;
    progress: number;
    type: string;
    removed?: boolean;
    isComplete?: boolean;
};
export declare const createProgressContext: ({ url, service, }: CreateProgressContextProps) => CreateProgressContextProps;
