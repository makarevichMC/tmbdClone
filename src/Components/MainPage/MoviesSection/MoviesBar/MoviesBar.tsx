import React, {FC} from 'react';
import {MovieBarData, MovieDetails, TVDetails} from '../../../../Types/Types';
import SmallMovieCard from './SmallMovieCard/SmallMovieCard';
import styles from './MoviesBar.module.css';
import {uniqueFunc} from "../../../../Utils/Utils";


interface MovieContainerProps {
    data: MovieBarData[] | MovieDetails[] | TVDetails[]
    imgBaseUrl: string
}


const MoviesBar: FC<MovieContainerProps> = ({data, imgBaseUrl}) => {

    const dataToAny = data as any[]
    const uniqueData = uniqueFunc(dataToAny) as MovieBarData[] | MovieDetails[] | TVDetails[] |null

    let cards

    if (uniqueData) {
        cards = uniqueData.map(el => {

            const type = el.name ? 'TV' : 'MOVIE'
            const title = el.title || el.name
            const date = el.release_date || el.first_air_date

            return (
                <div className={styles.card_item} key={el.id}>
                    <SmallMovieCard
                        imageUrl={imgBaseUrl + el.poster_path}
                        title={title}
                        date={date}
                        rating={el.vote_average * 10}
                        id={el.id}
                        type={type}
                    />
                </div>)
        })
    }


    return (
        <div>
            <div className={styles.cards_wrapper}>
                {cards}
            </div>
        </div>
    );
};

export default MoviesBar;