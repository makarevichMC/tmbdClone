import React, {FC, useState} from 'react';
// @ts-ignore
import styles from './Button.module.css';

interface buttonProps {
    text: string
    width?:string
    height?:string
    callback?:(...args:any) => any
}

const Button: FC<buttonProps> = ({text,width,callback,height}) => {

    const [isActive, setIsActive] = useState<boolean>(false);

    const changeIsActive = (): void => {
        setIsActive(prev => !prev);
    }

    return (
        <div>
            <button
                onClick={callback && callback}
                onMouseOver={changeIsActive}
                onMouseLeave={changeIsActive}
                className={isActive ? `${styles.btn} ${styles.active}` : styles.btn}
                style={{width,height}}>
                {text}
            </button>
        </div>
    );
};

export default Button;