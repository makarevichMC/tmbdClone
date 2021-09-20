import React, {FC} from 'react';
import {MovieBarData, MovieDetails, TVDetails} from "../../../../Types/Types";
import SmallMovieCard from "./SmallMovieCard/SmallMovieCard";
import styles from './MoviesBar.module.css';

interface MovieContainerProps {
    data: MovieBarData[] | MovieDetails[]|TVDetails[]
    imgBaseUrl: string
}


const MoviesBar: FC<MovieContainerProps> = ({data,imgBaseUrl}) => {

    const cards = data.map(el => {
        const title = el.title || el.name;
        const date = el.release_date || el.first_air_date;
        return (
            <div className={styles.card_item} key={el.id}>
                <SmallMovieCard
                    imageUrl={imgBaseUrl + el.poster_path}
                    title={title}
                    date={date}
                    rating={el.vote_average * 10}
                    id={el.id}
                />
            </div>)
    })

    return (
        <div>
            <div className={styles.cards_wrapper}>
                {cards}
            </div>
        </div>
    );
};

export default MoviesBar;