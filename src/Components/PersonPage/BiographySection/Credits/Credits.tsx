import React, {FC, useState} from 'react';
import styles from './Credits.module.css';
import {CreditsData} from '../../../../Types/Types';

type CreditsProps = {
    credits: CreditsData[]
}

const Credits: FC<CreditsProps> = ({credits}) => {

    const [data, setData] = useState(credits)
    const dataToRender = data.map((el, i, arr) => {
        if (i === 0) return <div className={styles.item_with_border}
                                 key={i}>{el.date}{el.title} as {el.character}</div>
        if (i !== 0) {
            if (Number(el.date.slice(0, 4)) !== Number(arr[i - 1].date.slice(0, 4))) {
                return <div className={styles.item_with_border}
                            key={i}>{el.date}{el.title} as {el.character}</div>
            } else {
                return <div className={styles.item} key={i}>{el.date}{el.title} as {el.character}</div>
            }
        }
    })
    return (
        <div className={styles.credits_wrapper}>
            {dataToRender}
        </div>
    );
};

export default Credits;