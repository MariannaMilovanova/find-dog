import React from 'react';
import { b, createBlock } from "../../helpers/bem";
const block = createBlock('Header');

let Header = () => {
    return (
        <div className={b(block)}>
            <div className={b(block, 'welcome')}> Search for Venues :)</div>
        </div>
    );
};
export default Header;