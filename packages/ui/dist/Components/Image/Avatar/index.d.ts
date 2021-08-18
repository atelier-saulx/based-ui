import { FunctionComponent } from 'react';
import { DataEventHandler } from '../../../types';
export declare type AvatarProps = {
    src?: string;
    name?: string;
    onClick?: DataEventHandler;
    size?: number;
};
declare const Avatar: FunctionComponent<AvatarProps>;
export default Avatar;
