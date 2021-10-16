import React, {FC, useEffect} from 'react';
import {RootState} from "../../redux/store";
import {connect, ConnectedProps} from "react-redux";
import MainPage from "./MainPage";
import {SetMainPageThunk, SetTrailersThunk} from "../../redux/reducers/mainPageReducer";
import {SetQueryAC} from '../../redux/reducers/searchPageReducer';


const MainPageContainer:FC<ReduxProps> = (props) => {

    useEffect(()=>{
        props.SetMainPageThunk();
        props.SetTrailersThunk();
    },[])

    return (
        <MainPage
            url={props.url} setQuery = {props.SetQueryAC }
            dayTrendMovie={props.dayTrendingMovies}
            weekTrendMovie={props.weekTrendingMovies}
            weekTrendTV={props.weekTrendingTV}
            dayTrendTV={props.dayTrendingTV}
            popularTV={props.popularTVs}
            popularMovies={props.popularMovies}
            trailers = {props.trailers}
        />
    );
};
const mapStateToProps = (state:RootState) => {

    let url;
    url = state.config.images.base_url + state.config.images.poster_sizes[1];
    return {
        url,
        dayTrendingTV:state.mainPage.trendingBarDay.tv,
        weekTrendingTV:state.mainPage.trendingBarWeek.tv,
        dayTrendingMovies:state.mainPage.trendingBarDay.movies,
        weekTrendingMovies:state.mainPage.trendingBarWeek.movies,
        popularTVs:state.mainPage.popularBar.tv,
        popularMovies:state.mainPage.popularBar.movies,
        trailers:state.mainPage.trailerBar,

    }
}


const connector = connect(mapStateToProps,{SetMainPageThunk,SetTrailersThunk,SetQueryAC});
type ReduxProps = ConnectedProps<typeof connector>;

export default  connector(MainPageContainer) ;