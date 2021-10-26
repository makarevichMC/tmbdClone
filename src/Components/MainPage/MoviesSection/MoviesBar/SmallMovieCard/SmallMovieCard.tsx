import React, {FC, useState} from 'react';
import PercentageBar from '../../../../Common/PercentageBar/PercentageBar';
import styles from './SmallMovieCard.module.css';
import {NavLink} from 'react-router-dom';
import MoreButton from "../../../MoreButton/MoreButton";
import {mediaType} from "../../../../../Types/Types";



interface smallMovieCard {
    imageUrl: string
    title: string | undefined
    date: string | undefined
    rating: number
    id: number
    type:mediaType
}

const SmallMovieCard: FC<smallMovieCard> = ({imageUrl, title, date, rating, id,type}) => {

    const [highlighted, setHighlighted] = useState<boolean>(false)
    const highlightToggle = () => {
        setHighlighted(p => !p)
    }
    const titleStyle = highlighted ? styles.highlighted_title : styles.title
    let url:string;
    const parameter = type.toLowerCase()
    switch (type) {
        case "MOVIE":
            url = `/movie_details/${parameter}/${id}`
            break
        case "TV":
            url = `/tv_details/${parameter}/${id}`
    }
    return (
        <div className={styles.card_wrapper}>
            <div className={styles.more_btn}>
                <MoreButton id={id}/>
            </div>
            <NavLink to={url}>
                <img className={styles.card_img} src={imageUrl} alt={'not found'}/>
            </NavLink>
            <div onMouseEnter={highlightToggle} onMouseLeave={highlightToggle} className={titleStyle}>
                <NavLink to={url}>
                    {title}
                </NavLink>
            </div>
            <span className={styles.date}>{date}</span>
            <div className={styles.popularity}>
                <PercentageBar rating={rating} size={34}/>
            </div>
        </div>
    );
};

export default SmallMovieCard;