import React, {FC, useState} from 'react';
import {NavLink} from "react-router-dom";
// @ts-ignore
import styles from './NavItem.module.css'


interface NavItemProps {
    text: string | undefined
    url: string
    addStyle?: string
}

const NavItem: FC<NavItemProps> = ({text, url, addStyle, children}) => {
    const [openMenu, setOpenMenu] = useState(false);
    const computedStyles = addStyle ? `${addStyle} ${styles.wrapper}` : styles.wrapper;


    return (
        <div
            onMouseOver={() => {
                setOpenMenu(true)
            }}
            onMouseLeave={() => {
                setOpenMenu(false)
            }}
            className={computedStyles}
        >
            <NavLink to={url}>{text}</NavLink>

            <div className={styles.children}>
                {openMenu && children}
            </div>
        </div>
    );
};

export default NavItem;





