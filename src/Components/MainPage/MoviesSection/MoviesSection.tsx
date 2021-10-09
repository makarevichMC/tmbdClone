import React, {FC, useEffect, useState} from 'react';
//@ts-ignore
import styles from './MoviesSection.module.css';
import MoviesBar from './MoviesBar/MoviesBar';
import {MovieBarData, MovieDetails, TVDetails} from '../../../Types/Types';
import SwitchBar from './SwitchBar/SwitchBar';


interface Props {
    data:{
            labels:string[]
            movies: Array<MovieBarData[]|MovieDetails[]|TVDetails[]>
    }
    url:string
    title:string
}
const MoviesSection:FC<Props> = ({data,url,title}) => {

    const [movies,setMovies] = useState(data.movies[0]);

    useEffect(()=>{
        setMovies(data.movies[0])
    },[data])


    const changeMovieData = (currentBar:string) => {
        let index = data.labels.indexOf(currentBar);
        setMovies(data.movies[index]);
    }

    return (
        <div className={styles.wrapper}>
            <div className={styles.title_section}>
                <h2>{title}</h2>
                <SwitchBar labels={data.labels} changeMovieData={changeMovieData}/>
            </div>
                <MoviesBar data={movies} imgBaseUrl={url}/>
        </div>
    );
};

export default MoviesSection;