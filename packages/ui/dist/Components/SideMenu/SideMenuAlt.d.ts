import { FunctionComponent } from 'react';
import { TextValue } from '@based/text';
declare type SideMenuAltProps = {
    active: string;
    prefix: string;
    sections: {
        label: TextValue;
        items: {
            label: TextValue;
            to: string;
        }[];
    }[];
};
declare const SideMenuAlt: FunctionComponent<SideMenuAltProps>;
export { SideMenuAlt };
