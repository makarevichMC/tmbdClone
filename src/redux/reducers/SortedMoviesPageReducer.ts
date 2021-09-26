import {Action, mediaType, MovieBarData} from '../../Types/Types'
import {Dispatch} from 'redux'
import {filterType, mainPageAPI, moviesSortAPI, tvSortAPI} from '../../API/api'
import store, {RootState} from '../store'
import {deepEqual} from '../../Utils/Utils';

export type SortingType = 'popularity.desc' | 'vote_average.desc' | 'release_date.desc'
    | 'popularity.asc' | 'vote_average.asc' | 'release_date.asc'



export type initialSorting = 'popular' | 'now-playing' | 'upcoming' | 'top-rated'
    | 'airing-today' | 'on-the-air'

export type sortedMoviesPageState = {
    pageData: MovieBarData[] | null
    lastPage: number
    currentSorting:filterType
}


export enum SortedMoviesPageActions {
    SET_PAGE = 'SET_PAGE',
    CHANGE_PAGE_NUMBER = 'CHANGE_PAGE',
    FETCH_NEXT_PAGE = 'FETCH_NEXT_PAGE',
    SET_SORTING_TYPE = 'SET_SORTING_TYPE',
}

export type fetchNextPageAction = {
    type:SortedMoviesPageActions.FETCH_NEXT_PAGE,
    payload:{
        data:MovieBarData[]
    }
}

export type setSortedMoviesPageAction = {
    type: SortedMoviesPageActions.SET_PAGE,
    payload: {
        data: MovieBarData[]
    }
}
export type setPageNumberAction = {
    type:SortedMoviesPageActions.CHANGE_PAGE_NUMBER,
    payload: {
        pageNumber:number
    }
}
export type setSortingTypeAction = {
    type:SortedMoviesPageActions.SET_SORTING_TYPE
    payload:{
        sortingType:null | initialSorting | SortingType
    }
}
const fetchNextPageAC = (data:MovieBarData[]):fetchNextPageAction => ({
    type:SortedMoviesPageActions.FETCH_NEXT_PAGE,
    payload:{
        data
    }
})

const setSortedMoviesPageAC = (data: MovieBarData[]): setSortedMoviesPageAction => ({
    type: SortedMoviesPageActions.SET_PAGE,
    payload: {
        data
    }
})

const setPageNumberAC = (pageNumber:number):setPageNumberAction => ({
    type:SortedMoviesPageActions.CHANGE_PAGE_NUMBER,
    payload:{
        pageNumber
    }
})

export const setCurrentSortingTypeAC = (sortingType:null | initialSorting | SortingType):setSortingTypeAction => ({
    type:SortedMoviesPageActions.SET_SORTING_TYPE,
    payload:{
        sortingType
    }
})

const initialState: sortedMoviesPageState = {
    pageData: null,
    lastPage: 0,
    currentSorting: null
}

type sortedMoviesPageAction =
    setSortedMoviesPageAction | setSortingTypeAction |
    setPageNumberAction |fetchNextPageAction

export const sortedMoviesPageReducer = (state = initialState, action: sortedMoviesPageAction): sortedMoviesPageState => {
    switch (action.type) {
        case SortedMoviesPageActions.SET_PAGE:
            if (!deepEqual(state.pageData,action.payload.data)){
                return {...state, pageData: action.payload.data}
            }
            break
        case SortedMoviesPageActions.SET_SORTING_TYPE:
            return {...state,currentSorting:action.payload.sortingType}
        case SortedMoviesPageActions.CHANGE_PAGE_NUMBER:
            return {...state,lastPage:action.payload.pageNumber}
        case SortedMoviesPageActions.FETCH_NEXT_PAGE:
            if (state.pageData){
                return {...state,pageData:[...state.pageData,...action.payload.data]}
            }
            break
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
        dispatch(setCurrentSortingTypeAC(dataType))
        dispatch(setPageNumberAC(1));
}

export const fetchMoreMoviesThunk = (type:mediaType,filterType:filterType) => async (dispatch:Dispatch<Action>,getState:()=>RootState) => {
    // if (filterType ==='popular' || filterType ==='top-rated' || filterType === 'upcoming'||
    //     filterType === 'now-playing'||filterType ==='on-the-air'||filterType ==='airing-today' ){
    //     dispatch()
    // }
    let result
    let page = getState().sortedPage.lastPage + 1;

    console.log('PAGE', page,)
    if (type === 'MOVIE') {
        switch (filterType) {
            case 'popular':
                result = await mainPageAPI.getPopularMovies(page)
                dispatch(fetchNextPageAC(result.results))
                break
            case 'top-rated':
                result = await moviesSortAPI.getTopRated(page)
                dispatch(fetchNextPageAC(result.results))
                break
            case 'upcoming':
                result = await moviesSortAPI.getUpcoming(page)
                dispatch(fetchNextPageAC(result.results))
                break
            case 'now-playing':
                result = await moviesSortAPI.getNowPlaying(page)
                dispatch(fetchNextPageAC(result.results))
                break
        }
    } else if (type === 'TV'){
        switch (filterType) {
            case 'popular':
                result = await mainPageAPI.getPopularTV(page)
                dispatch(fetchNextPageAC(result.results))
                break
            case 'top-rated':
                result = await tvSortAPI.getTopRated(page)
                dispatch(fetchNextPageAC(result.results))
                break
            case 'airing-today':
                result = await tvSortAPI.getAiringToday(page)
                dispatch(fetchNextPageAC(result.results))
                break
            case 'on-the-air':
                result = await tvSortAPI.getOnTheAir(page)
                dispatch(fetchNextPageAC(result.results))
        }
    }
    dispatch(setCurrentSortingTypeAC(filterType))
    dispatch(setPageNumberAC(page));
}