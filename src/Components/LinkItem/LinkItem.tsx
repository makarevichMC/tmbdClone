import React, {FC} from 'react';
import {NavLink} from 'react-router-dom';
import styles from './LinkItem.module.css';

export enum LinkItemStyles {
    main = 'main',
    dropdown = 'dropdown'
}

interface LinkItemProps {
    text:string|undefined
    url:string
    addStyle?:string
    onCLick?:(args:any)=>any
    variant:LinkItemStyles
}

const LinkItem:FC<LinkItemProps> = ({text,url,addStyle,onCLick,variant,children}) => {
    // @ts-ignore
    const variantStyles = addStyle ? `${styles[variant]} ${addStyle}` : styles[variant];



    return (
                <div onClick={onCLick}  className={variantStyles}>
                    <NavLink to={url}>{text}</NavLink>
                    <div className={styles.children}>
                        {children}
                    </div>
                </div>
    );
};

export default LinkItem;