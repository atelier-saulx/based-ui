import { EventHandler, SyntheticEvent } from 'react';
export declare type ContextualMenuEvent = {
    onClick: EventHandler<SyntheticEvent>;
    onContextMenu: EventHandler<SyntheticEvent>;
};
declare const useContextualMenu: (fn: EventHandler<SyntheticEvent>) => {
    onClick: (e: any) => void;
    onContextMenu: (e: any) => void;
};
export default useContextualMenu;
