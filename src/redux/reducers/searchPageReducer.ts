import {Dispatch} from 'redux';
import {Action} from '../../Types/Types';
import {movieQueryResult, personQueryResult, searchPageAPI, tvQueryResult} from '../../API/api';
import {deepEqual} from '../../Utils/Utils';
import {GeneralQueryResultData} from '../../Components/SearchPage/QueryResults/QueryResultBar/QueryResultBar';
import {RootState} from '../store';
import {getMovieResultsReselect, getPersonResultsReselect, getTvResultsReselect} from '../../Selectors/Selectors';

const initialState = {
    query: null as string | null,
    currentResults: [] as GeneralQueryResultData[] | null,
    movieResponse: [] as movieQueryResult[],
    tvResponse: [] as tvQueryResult[],
    personResponse: [] as personQueryResult[],
    currentPageNumber: null as number | null,
    pagesCount: {
        movies: 0,
        tvs: 0,
        people: 0
    },
    resultsCount: {
        movies: 0,
        tvs: 0,
        people: 0
    },
    currentType: null as null | 'tv' | 'movie' | 'person'
}

enum SearchPageActions {
    SET_QUERY = 'SET_QUERY',
    SET_CURRENT_PAGE_NUMBER = 'SET_CURRENT_PAGE_NUMBER',
    SET_PAGES_COUNT = 'SET_PAGES_COUNT',
    SET_MOVIE_RESPONSE = 'SET_MOVIE_RESPONSE',
    SET_TV_RESPONSE = 'SET_TV_RESPONSE',
    SET_PERSON_RESPONSE = 'SET_PERSON_RESPONSE',
    SET_RESULTS_COUNT = 'SET_RESULTS_COUNT',
    SET_CURRENT_RESULTS = 'SET_CURRENT_RESULTS',
    SET_CURRENT_TYPE = 'SET_CURRENT_TYPE'
}

type SetCurrentTypeAction = {
    type: SearchPageActions.SET_CURRENT_TYPE,
    payload: {
        type: null | 'tv' | 'movie' | 'person'
    }
}

type SetResultCountAction = {
    type: SearchPageActions.SET_RESULTS_COUNT,
    payload: {
        resultsCount: {
            movies: number,
            tvs: number,
            people: number
        }
    }
}

type SetMovieResponseAction = {
    type: SearchPageActions.SET_MOVIE_RESPONSE,
    payload: {
        movieResponse: movieQueryResult[]
    }
}

type SetTvResponseAction = {
    type: SearchPageActions.SET_TV_RESPONSE,
    payload: {
        tvResponse: tvQueryResult[]
    }
}
type SetPersonResponseAction = {
    type: SearchPageActions.SET_PERSON_RESPONSE,
    payload: {
        personResponse: personQueryResult[]
    }
}

type SetCurrentPageNumberAction = {
    type: SearchPageActions.SET_CURRENT_PAGE_NUMBER,
    payload: {
        currentPageNumber: number
    }
}
type SetPagesCountAction = {
    type: SearchPageActions.SET_PAGES_COUNT,
    payload: {
        pagesCount: {
            movies: number,
            tvs: number,
            people: number
        }
    }
}

type SetQueryAction = {
    type: SearchPageActions.SET_QUERY,
    payload: {
        query: string
    }
}
type SetCurrentResultsAction = {
    type: SearchPageActions.SET_CURRENT_RESULTS,
    payload: {
        currentResults: GeneralQueryResultData[] | null
    }
}

export const SetCurrentTypeAC = (type: null | 'tv' | 'movie' | 'person'): SetCurrentTypeAction => ({
    type: SearchPageActions.SET_CURRENT_TYPE,
    payload: {
        type
    }
})

const SetResultsCountAC = (movies: number, tvs: number, people: number): SetResultCountAction => ({
    type: SearchPageActions.SET_RESULTS_COUNT,
    payload: {
        resultsCount: {
            movies,
            tvs,
            people
        }
    }
})

export const SetMovieQueryResponseAC = (movieResponse: movieQueryResult[]): SetMovieResponseAction => ({
    type: SearchPageActions.SET_MOVIE_RESPONSE,
    payload: {
        movieResponse
    }
})
export const SetTvQueryResponseAC = (tvResponse: tvQueryResult[]): SetTvResponseAction => ({
    type: SearchPageActions.SET_TV_RESPONSE,
    payload: {
        tvResponse
    }
})
export const SetPersonQueryResponseAC = (personResponse: personQueryResult[]): SetPersonResponseAction => ({
    type: SearchPageActions.SET_PERSON_RESPONSE,
    payload: {
        personResponse
    }
})

export const SetPagesCountAC = (movies: number, tvs: number, people: number): SetPagesCountAction => ({
    type: SearchPageActions.SET_PAGES_COUNT,
    payload: {
        pagesCount: {
            movies,
            tvs,
            people
        }
    }
})


export const SetCurrentPageNumberAC = (currentPageNumber: number): SetCurrentPageNumberAction => ({
    type: SearchPageActions.SET_CURRENT_PAGE_NUMBER,
    payload: {
        currentPageNumber
    }
})

export const SetCurrentResultsAC = (currentResults: GeneralQueryResultData[] | null): SetCurrentResultsAction => ({
    type: SearchPageActions.SET_CURRENT_RESULTS,
    payload: {
        currentResults
    }
})

export const SetQueryAC = (query: string): SetQueryAction => ({
    type: SearchPageActions.SET_QUERY,
    payload: {
        query
    }
})

type SearchPageAction = SetQueryAction | SetCurrentResultsAction | SetCurrentPageNumberAction |
    SetPagesCountAction | SetMovieResponseAction | SetTvResponseAction |
    SetPersonResponseAction | SetResultCountAction | SetCurrentTypeAction

export const searchPageReducer = (state = initialState, action: SearchPageAction): typeof initialState => {
    switch (action.type) {
        case SearchPageActions.SET_CURRENT_TYPE:
            return {...state, currentType: action.payload.type}
        case SearchPageActions.SET_RESULTS_COUNT:

            return {...state, resultsCount: action.payload.resultsCount}

        case SearchPageActions.SET_QUERY:

            return {...state, query: action.payload.query}

        case SearchPageActions.SET_CURRENT_PAGE_NUMBER:

            return {...state, currentPageNumber: action.payload.currentPageNumber}

        case SearchPageActions.SET_PAGES_COUNT:

            return {...state, pagesCount: action.payload.pagesCount}

        case SearchPageActions.SET_MOVIE_RESPONSE:

            if (!deepEqual(action.payload.movieResponse, state.movieResponse)) {

                return {...state, movieResponse: action.payload.movieResponse}

            }
            break
        case SearchPageActions.SET_TV_RESPONSE:

            if (!deepEqual(action.payload.tvResponse, state.tvResponse)) {

                return {...state, tvResponse: action.payload.tvResponse}

            }
            break
        case SearchPageActions.SET_PERSON_RESPONSE:

            if (!deepEqual(action.payload.personResponse, state.personResponse)) {

                return {...state, personResponse: action.payload.personResponse}

            }
            break

        case SearchPageActions.SET_CURRENT_RESULTS:

            if (!deepEqual(action.payload.currentResults, state.currentResults)) {
                return {...state, currentResults: action.payload.currentResults}
            }
    }

    return state
}


export const setQueryResultsThunk = (query: string | null, page: number) => async (dispatch: Dispatch<Action>, getState: () => RootState) => {

    if (!query) return

    const type = getState().searchPage.currentType

    let movies, tvs, people

    try {
        movies = await searchPageAPI.getSearchData<'movie'>(query, page, 'movie')
        tvs = await searchPageAPI.getSearchData<'tv'>(query, page, 'tv')
        people = await searchPageAPI.getSearchData<'person'>(query, page, 'person')
    } catch (e) {
        console.log('request canceled')
        return
    }

    dispatch(SetMovieQueryResponseAC(movies.results))

    dispatch(SetTvQueryResponseAC(tvs.results))

    dispatch(SetPersonQueryResponseAC(people.results))


    switch (type) {
        case null:
        case 'movie':
            const movieResults = getMovieResultsReselect(getState())
            dispatch(SetCurrentResultsAC(movieResults))

            break
        case 'tv':
            const tvResults = getTvResultsReselect(getState())
            dispatch(SetCurrentResultsAC(tvResults))
            break
        case 'person':
            const personResults = getPersonResultsReselect(getState())
            dispatch(SetCurrentResultsAC(personResults))
            break
    }


    let moviePages = 0, movieResults = 0,
        tvPages = 0, tvResults = 0,
        peoplePages = 0, peopleResults = 0

    if (movies.results.length !== 0) {
        moviePages = movies.total_pages
        movieResults = movies.total_results
        tvPages = tvs.total_pages
        tvResults = tvs.total_results
        peoplePages = people.total_pages
        peopleResults = people.total_results
    }

    dispatch(SetCurrentPageNumberAC(page))

    dispatch(SetResultsCountAC(
        movies.total_results,
        tvs.total_results,
        people.total_results
    ))

    dispatch(SetPagesCountAC(
        movies.total_pages,
        tvs.total_pages,
        people.total_pages
    ))

}