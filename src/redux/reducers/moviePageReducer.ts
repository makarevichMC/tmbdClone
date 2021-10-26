import {Action, Actor, CrewMember, MovieBarData, MovieDetails, TVDetails} from '../../Types/Types';
import {Dispatch} from 'redux';
import {movieInfoAPI, tvInfoAPI} from '../../API/api';
import {convertMovieDetailsType, convertTVDetailsType, deepEqual, TVandMovieDetails} from '../../Utils/Utils';


export interface moviePageState {
    movieDetails: TVandMovieDetails | null
    actors: Actor[]
    crew: CrewMember[]
    recomendations: MovieBarData[]
    mediaDetails: TVDetails | MovieDetails | null
}

const initialState: moviePageState = {
    movieDetails: null,
    actors: [],
    crew: [],
    recomendations: [],
    mediaDetails: null
}

export enum moviePageActions {
    SET_MOVIE_DETAILS = 'SET_MOVIE_DETAILS',
    SET_ACTORS = 'SET_ACTORS',
    SET_CREW = 'SET_CREW',
    SET_RECOMENDATIONS = 'SET_RECOMENDATIONS',
    // SET_TV_DETAILS = 'SET_TV_DETAILS',
}

// export type setTVDetailsAction = {
//     type: moviePageActions.SET_TV_DETAILS,
//     payload: {
//         details: TVDetails
//     }
// }
export type setMovieDetailsAction = {
    type: moviePageActions.SET_MOVIE_DETAILS,
    payload: {
        details: TVandMovieDetails
    }
}
export type setActorsAction = {
    type: moviePageActions.SET_ACTORS,
    payload: {
        actors: Actor[]
    }
}
export type setCrewAction = {
    type: moviePageActions.SET_CREW,
    payload: {
        crew: CrewMember[]
    }
}
export type setRecomendationsAction = {
    type: moviePageActions.SET_RECOMENDATIONS,
    payload: {
        recomendations: MovieBarData[]
    }
}

// const setTVDetailsAC = (details: TVDetails): setTVDetailsAction => ({
//     type: moviePageActions.SET_TV_DETAILS,
//     payload: {details}
// })

const setMovieDetailsAC = (details: TVandMovieDetails): setMovieDetailsAction => ({
    type: moviePageActions.SET_MOVIE_DETAILS,
    payload: {details}
})

const setActorsAC = (actors: Actor[]): setActorsAction => ({type: moviePageActions.SET_ACTORS, payload: {actors}})
const setCrewAC = (crew: CrewMember[]): setCrewAction => ({type: moviePageActions.SET_CREW, payload: {crew}})
const setRecomendationsAC = (recomendations: MovieBarData[]): setRecomendationsAction => ({
    type: moviePageActions.SET_RECOMENDATIONS,
    payload: {recomendations}
})

type moviePageAction =
    setMovieDetailsAction |
    setActorsAction |
    setCrewAction |
    setRecomendationsAction


export const moviePageReducer = (state = initialState, action: moviePageAction): moviePageState => {
    switch (action.type) {
        case moviePageActions.SET_MOVIE_DETAILS:
            if (deepEqual(action.payload.details, state.movieDetails)) {
                return state
            }
            return {...state, movieDetails: action.payload.details}
        // case moviePageActions.SET_MOVIE_DETAILS:
        //     if (deepEqual(action.payload.details,state.mediaDetails)) {
        //         return state
        //     }
        //     return {...state,mediaDetails:action.payload.details}
        // case moviePageActions.SET_TV_DETAILS:
        //     if (deepEqual(action.payload.details,state.mediaDetails)) {
        //         return state
        //     }
        //     return {...state,mediaDetails:action.payload.details}
        case moviePageActions.SET_ACTORS:
            return {...state, actors: action.payload.actors}
        case moviePageActions.SET_CREW:
            return {...state, crew: action.payload.crew}
        case moviePageActions.SET_RECOMENDATIONS:
            return {...state, recomendations: action.payload.recomendations}
    }
    return state
}


export const setMoviePageThunk = (id: string, tv: boolean = false) => async (dispatch: Dispatch<Action>) => {

    const innerId = Number(id);

    let results;

    if (tv) {
        results = await Promise.all([
            tvInfoAPI.getTVDetails(innerId),
            tvInfoAPI.getActorsAndCrew(innerId),
            tvInfoAPI.getTVRecomendations(innerId)
        ]);
        dispatch(setMovieDetailsAC(convertTVDetailsType(results[0])));

    } else {
        results = await Promise.all([
            movieInfoAPI.getMovieDetails(innerId),
            movieInfoAPI.getActorsAndCrew(innerId),
            movieInfoAPI.getMovieRecomendations(innerId)
        ]);
        dispatch(setMovieDetailsAC(convertMovieDetailsType(results[0])));
    }


    dispatch(setActorsAC(results[1].cast));
    dispatch(setCrewAC(results[1].crew));
    dispatch(setRecomendationsAC(results[2].results));
}