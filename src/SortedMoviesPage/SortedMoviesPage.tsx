import React, {FC} from 'react';
import {MovieBarData} from '../Types/Types';
import SmallMovieCard from '../Components/MainPage/MoviesSection/MoviesBar/SmallMovieCard/SmallMovieCard';

type SortedMoviesPageProps = {
    data: MovieBarData[] | null
    baseUrl: string
}

const SortedMoviesPage: FC<SortedMoviesPageProps> = (props) => {
    console.log(props.data)
    return (
        <div>
            {props.data && props.data.map(el => {

                console.log(props.baseUrl+el.poster_path)
                const url = props.baseUrl + el.poster_path

                return <SmallMovieCard
                    key={el.id}
                    date={el.release_date || el.first_air_date} id={el.id} title={el.title||el.name}
                    imageUrl={url} rating={el.vote_average * 10}
                />
            })}
        </div>
    );
};

export default SortedMoviesPage;