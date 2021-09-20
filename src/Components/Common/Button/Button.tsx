import React, {FC, useState} from 'react';
// @ts-ignore
import styles from './Button.module.css';

interface buttonProps {
    text: string
}

const Button: FC<buttonProps> = ({text}) => {

    const [isActive, setIsActive] = useState<boolean>(false);

    const changeIsActive = (): void => {
        setIsActive(prev => !prev);
    }

    return (
        <div>
            <button

                onMouseOver={changeIsActive}
                onMouseLeave={changeIsActive}
                className={isActive ? `${styles.btn} ${styles.active}` : styles.btn}>

                {text}
            </button>
        </div>
    );
};

export default Button;