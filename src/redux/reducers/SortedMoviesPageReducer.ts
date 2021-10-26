import {Action, dates, mediaType, MovieBarData} from '../../Types/Types'
import {Dispatch} from 'redux'
import {sortedPageAPI} from '../../API/api'
import {RootState} from '../store'
import {convertMediaType, deepEqual} from '../../Utils/Utils';

export type initialSortedData = {
    results: MovieBarData[]
    totalPages: number
    totalResults: number
    dates: dates | null
}

export type sortingType =
    'popularity.desc' | 'vote_average.desc' | 'primary_release_date.desc'
    | 'popularity.asc' | 'vote_average.asc' | 'primary_release_date.asc'
    | 'first_air_date.asc' | 'first_air_date.desc'

export type initialSorting =
    'popular' | 'now-playing' | 'upcoming'
    | 'top-rated' | 'airing-today' | 'on-the-air'

export type sortedPageData = {
    pageData: MovieBarData[]
    totalPages: number
    totalResults: number
}

export type sortedMoviesPageState = {
    pageDataResponse: sortedPageData
    lastPage: number
    initialSorting: initialSorting | null
    additionalSorting: sortingType | null
    genreSorting: number[] | null
    dateRange: dates | null
    pageCount: number | null
}


export enum SortedMoviesPageActions {
    SET_PAGE = 'SET_PAGE',
    CHANGE_PAGE_NUMBER = 'CHANGE_PAGE',
    FETCH_NEXT_PAGE = 'FETCH_NEXT_PAGE',
    SET_INITIAL_SORTING_TYPE = 'SET_INITIAL_SORTING_TYPE',
    SET_DATES = 'SET_DATES',
    SET_ADDITIONAL_SORTING = 'SET_ADDITIONAL_SORTING',
    SET_GENGRE_SORTING = 'SET_GENGRE_SORTING'
}

export type setGenreSortingAction = {
    type: SortedMoviesPageActions.SET_GENGRE_SORTING,
    payload: {
        genresID: number[] | null
    }
}

export type setAdditionalSortingAction = {
    type: SortedMoviesPageActions.SET_ADDITIONAL_SORTING,
    payload: {
        additionalSorting: sortingType | null
    }
}
export type setDatesAction = {
    type: SortedMoviesPageActions.SET_DATES
    payload: {
        dates: dates | null
    }
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
export const setGenreSortingAC = (genresID: number[] | null): setGenreSortingAction => ({
    type: SortedMoviesPageActions.SET_GENGRE_SORTING,
    payload: {
        genresID
    }
})

export const setAdditionalSortingAC = (additionalSorting: sortingType): setAdditionalSortingAction => ({
    type: SortedMoviesPageActions.SET_ADDITIONAL_SORTING,
    payload: {
        additionalSorting
    }
})

const setDatesAC = (dates: dates | null): setDatesAction => ({
    type: SortedMoviesPageActions.SET_DATES,
    payload: {
        dates
    }
})

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
    pageDataResponse: {
        totalPages: 0,
        totalResults: 0,
        pageData: []
    },
    lastPage: 0,
    initialSorting: null,
    additionalSorting: null,
    genreSorting: null,
    dateRange: null,
    pageCount: null
}

type sortedMoviesPageAction =
    setSortedMoviesPageAction | setInitialSortingTypeAction |
    setPageNumberAction | fetchNextPageAction | setDatesAction
    | setAdditionalSortingAction | setGenreSortingAction

export const sortedMoviesPageReducer = (state = initialState, action: sortedMoviesPageAction): sortedMoviesPageState => {
    switch (action.type) {
        case SortedMoviesPageActions.SET_ADDITIONAL_SORTING:
            return {
                ...state, additionalSorting: action.payload.additionalSorting
            }
        case SortedMoviesPageActions.SET_DATES:
            return {
                ...state, dateRange: action.payload.dates
            }
        case SortedMoviesPageActions.SET_PAGE:
            if (!deepEqual(state.pageDataResponse, action.payload.data)) {
                return {
                    ...state,
                    pageDataResponse: {...action.payload.data}
                }
            }
            break
        case SortedMoviesPageActions.SET_INITIAL_SORTING_TYPE:
            return {...state, initialSorting: action.payload.initialSorting}
        case SortedMoviesPageActions.CHANGE_PAGE_NUMBER:
            return {...state, lastPage: action.payload.pageNumber}
        case SortedMoviesPageActions.FETCH_NEXT_PAGE:
            return {
                ...state,
                pageDataResponse: {
                    ...state.pageDataResponse,
                    pageData: [...state.pageDataResponse.pageData, ...action.payload.data.pageData]
                }
            }
        case SortedMoviesPageActions.SET_GENGRE_SORTING:
            return {...state, genreSorting: action.payload.genresID}
    }
    return state

}


export const setSortedMoviesThunk = (type: mediaType, dataType: initialSorting = 'popular') => async (dispatch: Dispatch<Action>, getState: () => RootState) => {

    const result = await sortedPageAPI.getSortedMedia(convertMediaType(type, dataType), 1)
    dispatch(setInitialSortingTypeAC(dataType))
    dispatch(setDatesAC(result.dates)) // settingDates

    const state = getState().sortedPage
    const additionalSorting = state.additionalSorting
    const genreSorting = state.genreSorting
    const dateRange = state.dateRange
    const trueResult = await sortedPageAPI.getMoviesSortedBy(type, dataType, 1, genreSorting, additionalSorting, dateRange)
    dispatch(setPageNumberAC(1))
    dispatch(setSortedMoviesPageAC(trueResult))
}

export const fetchMoreMoviesThunk = (type: mediaType) => async (dispatch: Dispatch<Action>, getState: () => RootState) => {
    const state = getState().sortedPage
    const page = state.lastPage + 1
    const initialSorting = state.initialSorting
    const additionalSorting = state.additionalSorting
    const genreSorting = state.genreSorting
    const dateRange = state.dateRange

    const result = await sortedPageAPI.getMoviesSortedBy(type, initialSorting, page, genreSorting, additionalSorting, dateRange)

    dispatch(fetchNextPageAC(result))
    dispatch(setPageNumberAC(page))
}