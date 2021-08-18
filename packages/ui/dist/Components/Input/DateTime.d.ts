import { CSSProperties, FunctionComponent } from 'react';
import { Color } from '@based/theme';
import { OnValueChange, Timestamp } from '../../types';
declare type DateTimeProps = {
    style?: CSSProperties;
    border?: boolean;
    autoFocus?: boolean;
    onChange: OnValueChange<Timestamp>;
    identifier?: any;
    value?: Timestamp;
    color?: Color;
    useSeconds?: boolean;
};
declare const DateTimeInput: FunctionComponent<DateTimeProps>;
export { DateTimeInput };
