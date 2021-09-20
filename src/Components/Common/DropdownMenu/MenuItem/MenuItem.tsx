import React, {FC} from 'react';
import { NavLink } from 'react-router-dom';
// @ts-ignore
import styles from './MenuItem.module.css';

interface menuItemProps {
    text:string
    url:string
    ActionOnClick?:() =>{}
}

const MenuItem:FC<menuItemProps> = ({text,url,ActionOnClick}) => {
    return (
        <div className={styles.item} onClick={ActionOnClick}>
            <NavLink to={url}>{text}</NavLink>
        </div>
    );
};

export default MenuItem;