import React, {FC, useState} from 'react';
import styles from './Credits.module.css';
import {CreditsData, personCredits} from "../../../../Types/Types";

type CreditsProps = {
    credits:CreditsData[]
}

const Credits:FC<CreditsProps> = ({credits}) => {

    const [data,setData] = useState(credits)

    return (
        <div>
            {data.map(el=>{
                return <div key={el.id}>{el.date}{el.title} as {el.character}</div>
            })}
        </div>
    );
};

export default Credits;