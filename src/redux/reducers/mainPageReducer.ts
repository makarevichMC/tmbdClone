import {
    Action,
    mainPageReducerActions,
    mainPageState,
    MovieDetails,
    MovieListObject,
    setDayTrendingMoviesAction,
    setDayTrendingTVAction,
    setPopularMoviesAction,
    setPopularTVAction,
    setTrailersAction,
    setWeekTrendingMoviesAction,
    setWeekTrendingTVAction,
    TVDetails,
    TVListObject,
    videoListResultObject
} from '../../Types/Types';
import {Dispatch} from 'redux';
import {mainPageAPI, movieInfoAPI} from '../../API/api';


const initialState: mainPageState = {
    popularBar: {
        movies: [],
        tv: []
    },
    trendingBarDay: {
        movies: [],
        tv: []
    },
    trendingBarWeek: {
        movies: [],
        tv: []
    },
    trailerBar: []
}


const setPopularMoviesAC = (movies: MovieListObject[]): setPopularMoviesAction => ({
    type: mainPageReducerActions.FETCH_POPULAR_MOVIES,
    payload: movies
});


const setDayTrendingMoviesAC = (movies: MovieListObject[] | MovieDetails[]): setDayTrendingMoviesAction => ({
    type: mainPageReducerActions.FETCH_TRENDING_MOVIES_DAY,
    payload: movies
});
const setWeekTrendingMoviesAC = (movies: MovieListObject[] | MovieDetails[]): setWeekTrendingMoviesAction => ({
    type: mainPageReducerActions.FETCH_TRENDING_MOVIES_WEEK,
    payload: movies
});

const setPopularTVAC = (movies: TVListObject[]): setPopularTVAction => ({
    type: mainPageReducerActions.FETCH_POPULAR_TV,
    payload: movies
});

const setDayTrendingTVAC = (movies: TVListObject[] | TVDetails[]): setDayTrendingTVAction => ({
    type: mainPageReducerActions.FETCH_TRENDING_TV_DAY,
    payload: movies
});
const setWeekTrendingTVAC = (movies: TVListObject[] | TVDetails[]): setWeekTrendingTVAction => ({
    type: mainPageReducerActions.FETCH_TRENDING_TV_WEEK,
    payload: movies
});

const setTrailerBar = (trailers: videoListResultObject[]): setTrailersAction => ({
    type: mainPageReducerActions.FETCH_TRAILERS,
    payload: trailers
});

type MainPageAction =
    setPopularMoviesAction
    | setDayTrendingTVAction
    | setPopularTVAction
    | setWeekTrendingTVAction
    | setDayTrendingMoviesAction
    | setWeekTrendingMoviesAction
    | setTrailersAction

export const mainPageReducer = (state = initialState, action: MainPageAction): mainPageState => {
    switch (action.type) {
        case mainPageReducerActions.FETCH_POPULAR_MOVIES:

            return {...state, popularBar: {...state.popularBar, movies: action.payload}}
        case mainPageReducerActions.FETCH_POPULAR_TV: {
            return {...state, popularBar: {...state.popularBar, tv: action.payload}}
        }
        case mainPageReducerActions.FETCH_TRENDING_MOVIES_DAY:
            return {...state, trendingBarDay: {...state.trendingBarDay, movies: action.payload}}
        case mainPageReducerActions.FETCH_TRENDING_MOVIES_WEEK:
            return {...state, trendingBarWeek: {...state.trendingBarWeek, movies: action.payload}}
        case mainPageReducerActions.FETCH_TRENDING_TV_DAY: {
            return {...state, trendingBarDay: {...state.trendingBarDay, tv: action.payload}}
        }
        case mainPageReducerActions.FETCH_TRENDING_TV_WEEK: {
            return {...state, trendingBarWeek: {...state.trendingBarWeek, tv: action.payload}}
        }
        case mainPageReducerActions.FETCH_TRAILERS: {
            return {...state, trailerBar: action.payload}
        }
    }
    return state
}


export const SetMainPageThunk = () => async (dispatch: Dispatch<Action>) => {

    const results = await Promise.all(
        [
            mainPageAPI.getTrendingMovies(true),
            mainPageAPI.getTrendingMovies(),
            mainPageAPI.getTrendingTV(true),
            mainPageAPI.getTrendingTV(),
            mainPageAPI.getPopularMovies(1),
            mainPageAPI.getPopularMovies(2),
            mainPageAPI.getPopularTV(1),
            mainPageAPI.getPopularTV(2)
        ]
    );


    const popularMovies = results[4].results.concat(results[5].results);
    const popularTV = results[6].results.concat(results[7].results);

    dispatch(setDayTrendingMoviesAC(results[0].results));
    dispatch(setWeekTrendingMoviesAC(results[1].results));
    dispatch(setDayTrendingTVAC(results[2].results));
    dispatch(setWeekTrendingTVAC(results[3].results));
    dispatch(setPopularMoviesAC(popularMovies));
    dispatch(setPopularTVAC(popularTV));

}

export const SetTrailersThunk = () => async (dispatch: Dispatch<Action>) => {

    const trailerMovies = await mainPageAPI.getTrailerMovies();
    const videos = await Promise.all(trailerMovies.results.map(movie => {
        return movieInfoAPI.getVideos(movie.id);
    }))
    const videosArrays = videos.filter(vid => vid.results.length === 1);
    const videosInfo = videosArrays.map(arr => arr.results[0]);

    dispatch(setTrailerBar(videosInfo));
}