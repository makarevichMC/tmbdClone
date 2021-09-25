import React, {FC, useState} from 'react';
import PercentageBar from '../../../../Common/PercentageBar/PercentageBar';
import styles from './SmallMovieCard.module.css';
import {NavLink} from 'react-router-dom';
import MoreButton from "../../../MoreButton/MoreButton";


interface smallMovieCard {
    imageUrl: string
    title: string | undefined
    date: string | undefined
    rating: number
    id: number
}

const SmallMovieCard: FC<smallMovieCard> = ({imageUrl, title, date, rating, id}) => {

    const [highlighted, setHighlighted] = useState<boolean>(false);
    const highlightToggle = () => {
        setHighlighted(p => !p)
    }
    const titleStyle = highlighted ? styles.highlighted_title : styles.title;
    return (
            <div className={styles.card_wrapper}>
                <div className={styles.more_btn}>
                    <MoreButton id={id}/>
                </div>
                <NavLink to={`/movies/${id}`}>
                    <img className={styles.card_img} src={imageUrl}/>
                </NavLink>
                <div onMouseEnter={highlightToggle} onMouseLeave={highlightToggle} className={titleStyle}>
                    <NavLink to={`/movies/${id}`}>
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