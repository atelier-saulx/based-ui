export declare const timeValueToMiliseconds: (value: Date | number | string | null) => number;
export declare const dateValueToTimestamp: (value: Date | number | string | null) => number;
export declare const milisecondsToTimeString: (miliseconds: number, useSeconds: boolean) => string | null;
export declare const timestampToDateString: (timestamp: number) => string | null;
export declare const validTime: (hours: number | string, minutes: number | string, seconds: number | string | null, useSeconds: boolean | null) => boolean;
export declare const parseTimeString: (value: string, useSeconds: boolean) => {
    valid: boolean;
    formatedString: string;
    milliseconds: number;
};
export declare const parseDateString: (value: string) => {
    valid: boolean;
    formatedString: string;
    timestamp: number;
};
export declare const getSelectionBlockIndex: (el: HTMLInputElement, blocks: number[][]) => number | null;
