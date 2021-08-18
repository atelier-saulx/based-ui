import { DropdownOption } from '../../Components/Overlay/Dropdown';
import { PositionProps } from './useOverlayPosition';
import { DataEventHandler } from '../../types';
export declare type OnSelect = (value: DropdownOption | DropdownOption[], index: number | number[]) => void;
declare const _default: (items: DropdownOption[], onSelect: OnSelect, value?: DropdownOption | DropdownOption[] | undefined, props?: PositionProps & {
    multi?: boolean;
    filter?: boolean;
}, handler?: () => () => void) => DataEventHandler;
export default _default;
