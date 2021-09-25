import {Action, mediaType, MovieBarData} from '../../Types/Types'
import {Dispatch} from 'redux'
import {mainPageAPI, moviesSortAPI, tvSortAPI} from '../../API/api'
import store from '../store'
import {deepEqual} from '../../Utils/Utils';

export type SortingType = 'popularity-desc' | 'rating-desc' | 'release_date-desc'
    | 'popularity-asc' | 'rating-asc' | 'release_date-asc'

export type initialSorting = 'popular' | 'now-playing' | 'upcoming' | 'top-rated'
    | 'airing-today' | 'on-the-air'

export type sortedMoviesPageState = {
    pageData: MovieBarData[] | null
    lastPage: number
}


export enum SortedMoviesPageActions {
    SET_PAGE = 'SET_PAGE',
    CHANGE_PAGE_NUMBER = 'CHANGE_PAGE',
    FETCH_NEXT_PAGE = 'FETCH_NEXT_PAGE',

}

export type setSortedMoviesPageAction = {
    type: SortedMoviesPageActions.SET_PAGE,
    payload: {
        data: MovieBarData[]
    }
}
export type changePageNumberAction = {
    type:SortedMoviesPageActions.CHANGE_PAGE_NUMBER,
    payload: {
        pageNumber:number
    }
}

const setSortedMoviesPageAC = (data: MovieBarData[]): setSortedMoviesPageAction => ({
    type: SortedMoviesPageActions.SET_PAGE,
    payload: {
        data
    }
})

const changePageNumberAC = (pageNumber:number):changePageNumberAction => ({
    type:SortedMoviesPageActions.CHANGE_PAGE_NUMBER,
    payload:{
        pageNumber
    }
})

const initialState: sortedMoviesPageState = {
    pageData: null,
    lastPage: 0,
}

type sortedMoviesPageAction = setSortedMoviesPageAction

export const sortedMoviesPageReducer = (state = initialState, action: sortedMoviesPageAction): sortedMoviesPageState => {
    switch (action.type) {
        case SortedMoviesPageActions.SET_PAGE:
            console.log('SET_PAGE')
            if (!deepEqual(state.pageData,action.payload.data)){
                console.log(state.pageData,action.payload.data)
                return {...state, pageData: action.payload.data}
            }
    }
    return state
}

export const setSortedMoviesThunk = (type: mediaType, dataType: initialSorting = 'popular') => async (dispatch: Dispatch<Action>) => {
    let result
    if (type === 'MOVIE') {
        switch (dataType) {
            case 'popular':
                result = await mainPageAPI.getPopularMovies(1)
                dispatch(setSortedMoviesPageAC(result.results))
                break
            case 'top-rated':
                result = await moviesSortAPI.getTopRated(1)
                dispatch(setSortedMoviesPageAC(result.results))
                break
            case 'upcoming':
                result = await moviesSortAPI.getUpcoming(1)
                dispatch(setSortedMoviesPageAC(result.results))
                break
            case 'now-playing':
                result = await moviesSortAPI.getNowPlaying(1)
                dispatch(setSortedMoviesPageAC(result.results))
                break
        }
    } else if (type === 'TV'){
        switch (dataType) {
            case 'popular':
                result = await mainPageAPI.getPopularTV(1)
                dispatch(setSortedMoviesPageAC(result.results))
                break
            case 'top-rated':
                result = await tvSortAPI.getTopRated(1)
                dispatch(setSortedMoviesPageAC(result.results))
                break
            case 'airing-today':
                result = await tvSortAPI.getAiringToday(1)
                dispatch(setSortedMoviesPageAC(result.results))
                break
            case 'on-the-air':
                result = await tvSortAPI.getOnTheAir(1)
                dispatch(setSortedMoviesPageAC(result.results))
        }
    }
        dispatch(changePageNumberAC(1));
}