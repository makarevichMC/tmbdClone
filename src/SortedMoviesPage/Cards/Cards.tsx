import React, {FC} from 'react';
import {mediaType, MovieBarData} from "../../Types/Types";
import {initialSorting} from "../../redux/reducers/SortedMoviesPageReducer";
import {filterType} from "../../API/api";
import styles from "./Cards.module.css";
import SmallMovieCard from "../../Components/MainPage/MoviesSection/MoviesBar/SmallMovieCard/SmallMovieCard";


type CardsProps = {
    data?: MovieBarData[] | null
    baseUrl: string
    fetchMore: (type: mediaType, dataType?: initialSorting) => any
    sortingType: filterType
    mediaType: mediaType
}

const Cards:FC<CardsProps> = (props) => {
    return (
        //@ts-ignore
        <div className={styles.cards}>
            {props.data && props.data?.map(el => {

                const url = props.baseUrl + el.poster_path
                //@ts-ignore
                return <div className={styles.item} key={el.id}>
                    <SmallMovieCard
                        date={el.release_date || el.first_air_date} id={el.id} title={el.title || el.name}
                        imageUrl={url} rating={el.vote_average * 10}
                    />
                </div>
            })}
        </div>
    );
};

export default Cards;