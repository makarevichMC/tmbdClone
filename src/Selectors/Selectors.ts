import {RootState} from '../redux/store'
import {movieQueryResult, personQueryResult, tvQueryResult} from '../API/api'
import {createSelector} from 'reselect'
import DefaultPhoto from '../images/DefaultProfile.png'
import DefaultImage from '../images/noImage.jpg'
import {GeneralQueryResultData} from '../Components/SearchPage/QueryResults/QueryResultBar/QueryResultBar';

const getMovieResults = (state: RootState): movieQueryResult[] => {
    return state.searchPage.movieResponse
}

const getTvResults = (state: RootState): tvQueryResult[] => {
    return state.searchPage.tvResponse
}
const getPersonResults = (state: RootState): personQueryResult[] => {
    return state.searchPage.personResponse
}

export const getQueryString = (state: RootState): string => {
    const query = state.searchPage.query
    if (!query) return ''
    return query
}

export const getBaseUrl = (state: RootState) => {
    return state.config.images.base_url
}


export const getMovieResultsReselect = createSelector([getMovieResults, getBaseUrl], (movieResults, baseUrl):GeneralQueryResultData[] => {

    let url
    let overview
    return movieResults.map((el) => {

        if (el.poster_path) {
            url = baseUrl + 'w185' + el.poster_path
        } else {
            url = DefaultImage
        }
        overview = el.overview.length > 140 ? el.overview.slice(0, 140) + '...' : el.overview

        return {
            type: 'movie',
            date: el.release_date,
            id: el.id,
            imageUrl: url,
            title: el.title ? el.title : el.original_title,
            overview: overview,
            knownFor: null,
            redirectUrl: `/movie_details/movie/${el.id}`
        }
    })
})
/////////////////////////////////////////
export const getTvResultsReselect = createSelector([getTvResults, getBaseUrl], (tvResults, baseUrl):GeneralQueryResultData[] => {

    let url
    let overview

    return tvResults.map((el) => {

        if (el.poster_path) {
            url = baseUrl + 'w185' + el.poster_path
        } else {
            url = DefaultImage
        }
        overview = el.overview.length > 140 ? el.overview.slice(0, 140) + '...' : el.overview
        return {
            type: 'tv',
            date: el.first_air_date,
            id: el.id,
            imageUrl: url,
            title: el.name ? el.name : el.original_name,
            overview: overview,
            knownFor: null,
            redirectUrl: `/tv_details/tv/${el.id}`
        }
    })
})

export const getPersonResultsReselect = createSelector([getPersonResults, getBaseUrl], (personResults, baseUrl):GeneralQueryResultData[] => {

    let url
    return personResults.map((el) => {

        if (el.profile_path) {
            url = baseUrl + 'w185' + el.profile_path
        } else {
            url = DefaultPhoto
        }

        return {
            type: 'person',
            id: el.id,
            imageUrl: url,
            title: el.name,
            knownFor: el.known_for_department,
            overview: null,
            date: null,
            redirectUrl: `/person/${el.id}`
        }
    })
})


export const getCurrentResults = (state:RootState) =>{
    return state.searchPage.currentResults
}

export const getLabelsWithCount = (state: RootState) => {
    const movies = state.searchPage.resultsCount.movies
    const tvs = state.searchPage.resultsCount.tvs
    const people = state.searchPage.resultsCount.people

    const labels = ['Фильмы', 'Сериалы', 'Люди']
    const numbers = [movies, tvs, people]


    return labels.map((label,i)=> ({
        label:label,
        count:numbers[i]
    }))

}

export const getPagesCount = (state:RootState) => {
    return state.searchPage.pagesCount
}

export const getCurrentPage = (state:RootState) => {
    return state.searchPage.currentPageNumber
}