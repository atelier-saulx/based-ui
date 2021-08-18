import { AsyncEvent } from '../../types';
import { EventHandler, SyntheticEvent } from 'react';
declare type GenericEventHandler = EventHandler<SyntheticEvent>;
declare const _default: (onClick: GenericEventHandler | AsyncEvent) => [boolean, GenericEventHandler];
export default _default;
