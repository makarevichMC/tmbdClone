import React, {FC} from 'react';
import {MovieDetails, MovieListObject, TVDetails, TVListObject, videoListResultObject} from "../../Types/Types";
import MoviesSection from "./MoviesSection/MoviesSection";
import TrailersBar from "./MoviesSection/TrailersBar/TrailersBar";
import SearchSection from './SearchSection/SearchSection';
import {backgroundUrls} from '../../Utils/Utils';


interface MainPageProps {
    dayTrendTV: TVListObject[]|TVDetails[],
    weekTrendTV: TVListObject[]|TVDetails[],
    dayTrendMovie: MovieListObject[]|MovieDetails[],
    weekTrendMovie: MovieListObject[]|MovieDetails[],
    popularTV: TVListObject[],
    popularMovies: MovieListObject[],
    url: string,
    trailers:videoListResultObject[]
    setQuery:(query:string)=>any
}

const MainPage: FC<MainPageProps> = (props) => {


    const trendingMovieData = {
        labels: ['Сегодня','На этой неделе'],
        movies: [props.dayTrendMovie, props.weekTrendMovie]
    }
    const trendingTVData = {
        labels: ['Сегодня','На этой неделе'],
        movies: [props.dayTrendTV, props.weekTrendTV]
    }
    const popularData = {
        labels: ['Фильмы','Сериалы'],
        movies: [props.popularMovies, props.popularTV]
    }

    return (
        <div>
            <SearchSection setQuery={props.setQuery} urls={backgroundUrls}/>
            <MoviesSection data={popularData} title={'Популярные'} url={props.url}/>
            <MoviesSection data={trendingMovieData} title={'Тренды фильмов'} url={props.url}/>
            <TrailersBar data={props.trailers} title={'Последние трейлеры'}/>
            <MoviesSection data={trendingTVData} title={'Тренды сериалов'} url={props.url}/>
        </div>
);
};



export default MainPage;