import {Action, APIConfigState, Config, Genre} from '../../Types/Types';
import {Dispatch} from 'redux';
import {configAPI} from '../../API/api';


const initialState: APIConfigState = {
    images: {
        base_url: '',
        secure_base_url: '',
        backdrop_sizes: [],
        still_sizes: [],
        logo_sizes: [],
        profile_sizes: [],
        poster_sizes: []
    },
    change_keys: [],
    tvGenres: [],
    movieGenres: [],
}

export enum setConfigReducerActions {
    SET_CONFIG = 'SET_CONFIG',
    SET_TV_GENRES = 'SET_TV_GENRES',
    SET_MOVIE_GENRES = 'SET_MOVIE_GENRES'
}
export type setConfigAction = {
    type: setConfigReducerActions.SET_CONFIG
    payload: Config
}
type setTvGenresAction = {
    type: setConfigReducerActions.SET_TV_GENRES,
    payload: {
        tvGenres: Genre[]
    }
}
type setMovieGenresAction = {
    type: setConfigReducerActions.SET_MOVIE_GENRES,
    payload: {
        movieGenres: Genre[]
    }
}
const setConfigAC = (config: Config): setConfigAction => ({
    type: setConfigReducerActions.SET_CONFIG,
    payload: config
});
const setTvGenresAC = (tvGenres: Genre[]): setTvGenresAction => ({
    type: setConfigReducerActions.SET_TV_GENRES,
    payload: {tvGenres}
})
const setMovieGenresAC = (movieGenres: Genre[]): setMovieGenresAction => ({
    type: setConfigReducerActions.SET_MOVIE_GENRES,
    payload: {movieGenres}
})

export type setConfigActionType = setConfigAction | setTvGenresAction | setMovieGenresAction


export const APIconfigReducer = (state = initialState, action: setConfigActionType): APIConfigState => {
    switch (action.type) {
        case 'SET_CONFIG':
            return {...state,...action.payload}
        case setConfigReducerActions.SET_MOVIE_GENRES:
            return {...state,movieGenres:action.payload.movieGenres}
        case setConfigReducerActions.SET_TV_GENRES:
            return {...state,tvGenres:action.payload.tvGenres}
    }
    return state
}


export const SetConfigThunk = () => async (dispatch: Dispatch<Action>) => {

    const response = await configAPI.getConfigurationAPI()
    const tvGenres = await configAPI.getGenres('TV')
    const movieGenres = await configAPI.getGenres('MOVIE')
    dispatch(setTvGenresAC(tvGenres))
    dispatch(setMovieGenresAC(movieGenres))
    dispatch(setConfigAC(response))

}