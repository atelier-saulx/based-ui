import { CSSProperties, FunctionComponent, EventHandler, SyntheticEvent } from 'react';
import { Color } from '@based/theme';
declare type GenericEventHandler = EventHandler<SyntheticEvent>;
declare type ClearProps = {
    style?: CSSProperties;
    color?: Color;
    onClick?: GenericEventHandler;
};
declare const Clear: FunctionComponent<ClearProps>;
export default Clear;
