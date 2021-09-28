import {Action, dates, mediaType, MovieBarData} from '../../Types/Types'
import {Dispatch} from 'redux'
import {filterType, sortedPageAPI} from '../../API/api'
import {RootState} from '../store'
import {deepEqual} from '../../Utils/Utils';


export type sortingType =
    'popularity.desc' | 'vote_average.desc' | 'release_date.desc'
    | 'popularity.asc' | 'vote_average.asc' | 'release_date.asc'
    | 'first_air_date.asc' | 'first_air_date.desc'

export type initialSorting =
    'popular' | 'now-playing' | 'upcoming'
    | 'top-rated' | 'airing-today' | 'on-the-air'

export type sortedPageData = {
        pageData: MovieBarData[]
        totalPages:number
        totalResults:number
}

export type sortedMoviesPageState = {
    pageDataResponse:sortedPageData
    lastPage: number
    initialSorting: initialSorting | null
    additionalSorting:sortingType| null
    genreSorting:number[]
    dateRange:null | dates
    pageCount:number|null
}


export enum SortedMoviesPageActions {
    SET_PAGE = 'SET_PAGE',
    CHANGE_PAGE_NUMBER = 'CHANGE_PAGE',
    FETCH_NEXT_PAGE = 'FETCH_NEXT_PAGE',
    SET_INITIAL_SORTING_TYPE = 'SET_INITIAL_SORTING_TYPE',
}

export type fetchNextPageAction = {
    type: SortedMoviesPageActions.FETCH_NEXT_PAGE,
    payload: {
        data: sortedPageData
    }
}

export type setSortedMoviesPageAction = {
    type: SortedMoviesPageActions.SET_PAGE,
    payload: {
        data: sortedPageData
    }
}
export type setPageNumberAction = {
    type: SortedMoviesPageActions.CHANGE_PAGE_NUMBER,
    payload: {
        pageNumber: number
    }
}
export type setInitialSortingTypeAction = {
    type: SortedMoviesPageActions.SET_INITIAL_SORTING_TYPE
    payload: {
        initialSorting: initialSorting | null
    }
}
const fetchNextPageAC = (data: sortedPageData): fetchNextPageAction => ({
    type: SortedMoviesPageActions.FETCH_NEXT_PAGE,
    payload: {
        data
    }
})

const setSortedMoviesPageAC = (data: sortedPageData): setSortedMoviesPageAction => ({
    type: SortedMoviesPageActions.SET_PAGE,
    payload: {
        data
    }
})

const setPageNumberAC = (pageNumber: number): setPageNumberAction => ({
    type: SortedMoviesPageActions.CHANGE_PAGE_NUMBER,
    payload: {
        pageNumber
    }
})

export const setInitialSortingTypeAC = (initialSorting: null | initialSorting): setInitialSortingTypeAction => ({
    type: SortedMoviesPageActions.SET_INITIAL_SORTING_TYPE,
    payload: {
        initialSorting
    }
})

const initialState: sortedMoviesPageState = {
    pageDataResponse:{
        totalPages:0,
        totalResults:0,
        pageData:[]
    },
    lastPage: 0,
    initialSorting: null,
    additionalSorting:null,
    genreSorting:[],
    dateRange:null,
    pageCount:null
}

type sortedMoviesPageAction =
    setSortedMoviesPageAction | setInitialSortingTypeAction |
    setPageNumberAction | fetchNextPageAction

export const sortedMoviesPageReducer = (state = initialState, action: sortedMoviesPageAction): sortedMoviesPageState => {
    switch (action.type) {
        case SortedMoviesPageActions.SET_PAGE:
            if (!deepEqual(state.pageDataResponse, action.payload.data)) {
                return {
                    ...state,
                    pageDataResponse: {
                        ...action.payload.data
                    }
                }
            }
            break
        case SortedMoviesPageActions.SET_INITIAL_SORTING_TYPE:
            return {...state,initialSorting:action.payload.initialSorting}
            break
        case SortedMoviesPageActions.CHANGE_PAGE_NUMBER:
            return {...state, lastPage: action.payload.pageNumber}
            break
        case SortedMoviesPageActions.FETCH_NEXT_PAGE:
            console.log(action.payload) //////////////////////////////////////////// !!!!!!!!!!!!
            if (state.pageDataResponse.pageData&&action.payload.data.pageData) {
                return {
                    ...state,
                    pageDataResponse: {
                        ...state.pageDataResponse,
                        pageData:[...state.pageDataResponse.pageData, ...action.payload.data.pageData]
                    }
                }
            }
            break
    }
    return state
}

export const setSortedMoviesThunk = (type: mediaType, dataType: initialSorting = 'popular') => async (dispatch: Dispatch<Action>) => {
    const result = await sortedPageAPI.getSortedMedia(type,dataType,1)
    if (result?.results){
        dispatch(setInitialSortingTypeAC(dataType))
        dispatch(setPageNumberAC(1))
        const Data = {
            pageData: result.results,
            totalPages:result.total_pages,
            totalResults:result.total_results
        }
        dispatch(setSortedMoviesPageAC(Data))
    }
}

export const fetchMoreMoviesThunk = (type:mediaType) => async (dispatch: Dispatch<Action>, getState: () => RootState) => {
    const state = getState().sortedPage
    const page = state.lastPage + 1
    const initialSorting = state.initialSorting
    const additionalSorting = state.additionalSorting
    const genreSorting = state.genreSorting
    const dateRange = state.dateRange

    const result = await sortedPageAPI.getMoviesSortedBy(type,initialSorting,page,genreSorting,additionalSorting,dateRange)

    dispatch(fetchNextPageAC(result))
    dispatch(setPageNumberAC(page))
}