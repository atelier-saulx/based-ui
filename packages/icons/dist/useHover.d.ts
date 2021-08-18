import { EventHandler, SyntheticEvent } from 'react';
export declare type Hover = [
    {
        onMouseDown: EventHandler<SyntheticEvent>;
        onMouseUp: EventHandler<SyntheticEvent>;
        onMouseEnter: EventHandler<SyntheticEvent>;
        onMouseLeave: EventHandler<SyntheticEvent>;
        onDragStart: EventHandler<SyntheticEvent>;
    },
    boolean,
    boolean
];
declare const useHover: (onHover?: EventHandler<SyntheticEvent>) => Hover;
export default useHover;
