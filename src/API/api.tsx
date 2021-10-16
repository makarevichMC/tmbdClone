import axios, {AxiosResponse, CancelTokenSource} from 'axios';
import {
    ActorsAndCrew,
    Config,
    dates,
    Genre, GenreResponse,
    GetMovieList,
    getMovies,
    getTV,
    GetTVList,
    ILogout,
    ISessionRequest,
    IToken,
    IUserInfo,
    mediaType,
    MovieDetails,
    MovieRecomendations,
    personCredits,
    personDetails,
    TVDetails,
    TVListObject,
    TVRecomendations,
    videoResponse
} from '../Types/Types';

import {
    initialSortedData,
    initialSorting,
    sortedPageData,
    sortingType
} from '../redux/reducers/SortedMoviesPageReducer';


const APIkey: string = '771d51cfcca51d5e93afff45320fea02';


let axiosInstance = axios.create({
    baseURL: 'https://api.themoviedb.org/3/',
})

//CONFIGURATION API

export const configAPI = {
    async getConfigurationAPI(): Promise<Config> {
        try {
            let response = await axiosInstance.get<Config>(`https://api.themoviedb.org/3/configuration?api_key=${APIkey}`)
            return response.data
        } catch (e: any) {
            return e.response.data
        }
    },
    async getGenres(mediaType: mediaType): Promise<Genre[]> {
        let type = mediaType.toLowerCase()
        let response = await axiosInstance.get<GenreResponse>(`genre/${type}/list?api_key=${APIkey}&language=ru-RU`)
        return response.data.genres
    }
}




//AUTHORIZATION API

export const AuthorizationAPI = {
    async getToken(): Promise<IToken> {
        try {
            let response = await axiosInstance.get<IToken>(`authentication/token/new?api_key=${APIkey}`);
            return response.data;
        } catch (e: any) {
            return e.response.data;
        }

    },
    async CreateLoginSession(username: string, password: string, request_token: string): Promise<IToken> {
        try {
            let response = await axiosInstance.post<IToken>(`authentication/token/validate_with_login?api_key=${APIkey}`, {
                username,
                password,
                request_token
            })
            return response.data;
        } catch (e: any) {
            return e.response.data;
        }

    },
    async CreateNewSession(request_token: string): Promise<ISessionRequest> {
        try {
            let response = await axiosInstance.post<ISessionRequest>(`authentication/session/new?api_key=${APIkey}`, {request_token})
            console.log(response)
            return response.data
        } catch (e: any) {
            return e.response.data
        }
    },
    async DeleteSession(session_id: string): Promise<ILogout> {
        try {
            let response = await axiosInstance.delete<ILogout>(`authentication/session?api_key=${APIkey}`, {data: {session_id}});
            console.log(response.data)
            return response.data
        } catch (e: any) {
            return e.response.data
        }
    }

}
//USER API

export const UserAPI = {
    async getUserInfo(sesion_id: string): Promise<IUserInfo> {
        const response = await axiosInstance.get<IUserInfo>(`account?api_key=${APIkey}&session_id=${sesion_id}`)
        return response.data
    },

    addMovieToFavorite(account_id: number, session_id: string) {
        return axiosInstance.post(`account/${account_id}/favorite?api_key=${APIkey}&session_id=${session_id}`,
            {
                'media_type': 'movie',
                'media_id': 551,
                'favorite': true
            },
            {headers: {'Content-Type': 'application/json;charset=utf-8'}})
            .then(resonse => console.log(resonse))
    }

}

//MAIN PAGE API

export const mainPageAPI = {
    async getPopularMovies(page: number): Promise<GetMovieList> {
        const response = await axiosInstance.get<getMovies>(`movie/popular?api_key=${APIkey}&language=ru-RU&page=${page}`);
        return response.data
    },
    async getTrendingMovies(this_day?: boolean): Promise<GetMovieList> {
        let time_window = 'week';
        if (this_day) time_window = 'day';
        const response = await axiosInstance.get<getMovies>(`/trending/movie/${time_window}?api_key=${APIkey}`);
        return response.data
    },
    async getPopularTV(page: number): Promise<GetTVList<TVListObject>> {
        const response = await axiosInstance.get<getTV>(`tv/popular?api_key=${APIkey}&language=ru-RU&page=${page}`);
        return response.data
    },
    async getTrendingTV(this_day?: boolean): Promise<GetTVList<TVListObject>> {
        let time_window = 'week';
        if (this_day) time_window = 'day';
        const response = await axiosInstance.get<getTV>(`trending/tv/${time_window}?api_key=${APIkey}`);
        return response.data
    },
    async getTrailerMovies(): Promise<getMovies> {
        const response = await axiosInstance.get<getMovies>(`discover/movie?api_key=${APIkey}&language=ru-RU&region=RU&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&primary_release_date.gte=2021-07-06&primary_release_date.lte=2021-09-06&with_watch_monetization_types=rent`);
        return response.data
    },
}

//MOVIE INFO API

export const movieInfoAPI = {
    async getVideos(id: number): Promise<videoResponse> {
        const response = await axiosInstance.get<videoResponse>(`/movie/${id}/videos?api_key=${APIkey}&language=ru-RU`);
        return response.data
    },
    async getMovieDetails(id: number): Promise<MovieDetails> {
        const response = await axiosInstance.get<MovieDetails>(`movie/${id}?api_key=${APIkey}&language=ru-RU`);
        return response.data
    },
    async getActorsAndCrew(id: number): Promise<ActorsAndCrew> {
        const response = await axiosInstance.get<ActorsAndCrew>(`movie/${id}/credits?api_key=${APIkey}&language=ru-RU`);
        return response.data
    },
    async getMovieRecomendations(id: number): Promise<MovieRecomendations> {
        const response = await axiosInstance.get<MovieRecomendations>(`movie/${id}/recommendations?api_key=${APIkey}&language=ru-RU&page=1`);
        return response.data
    }

}

//TV INFO API

export const tvInfoAPI = {
    async getVideos(id: number): Promise<videoResponse> {
        const response = await axiosInstance.get<videoResponse>(`tv/${id}/videos?api_key=${APIkey}&language=ru-RU`);
        return response.data
    },
    async getTVDetails(id: number): Promise<TVDetails> {
        const response = await axiosInstance.get<TVDetails>(`tv/${id}?api_key=${APIkey}&language=ru-RU`);
        return response.data
    },
    async getTVRecomendations(id: number): Promise<TVRecomendations> {
        const response = await axiosInstance.get<TVRecomendations>(`tv/${id}/recommendations?api_key=${APIkey}&language=ru-RU&page=1`);
        return response.data
    },
    async getActorsAndCrew(id: number): Promise<ActorsAndCrew> {
        const response = await axiosInstance.get<ActorsAndCrew>(`tv/${id}/credits?api_key=${APIkey}&language=ru-RU`);
        return response.data
    },
}

//PERSON PAGE API

export const personPageAPI = {
    async getPersonInfo(id: number): Promise<personDetails> {
        const response = await axiosInstance.get<personDetails>(`person/${id}?api_key=${APIkey}&language=ru-RU`);
        return response.data
    },
    async getPersonCredits(id: number): Promise<personCredits> {
        const response = await axiosInstance.get<personCredits>(`person/${id}/combined_credits?api_key=${APIkey}&language=ru-RU`);
        return response.data
    }
}

// MOVIE SORT PAGE API

export type filterType = null | initialSorting | sortingType


export const moviesSortAPI = {
    async getNowPlaying(page: number): Promise<GetMovieList> {
        const response = await axiosInstance.get<getMovies>(`movie/now_playing?api_key=${APIkey}&language=ru-RU&page=${page}`);
        return response.data
    },
    async getUpcoming(page: number): Promise<GetMovieList> {
        const response = await axiosInstance.get<getMovies>(`movie/upcoming?api_key=${APIkey}&language=ru-RU&page=${page}`)
        return response.data
    },
    async getTopRated(page: number): Promise<GetMovieList> {
        const response = await axiosInstance.get<getMovies>(`movie/top_rated?api_key=${APIkey}&language=ru-RU&page=${page}`)
        return response.data
    },
}

export const tvSortAPI = {
    async getAiringToday(page: number): Promise<GetTVList<TVListObject>> {
        const response = await axiosInstance.get<getTV>(`tv/airing_today?api_key=${APIkey}&language=ru-RU&page=${page}`);
        return response.data
    },
    async getOnTheAir(page: number): Promise<GetTVList<TVListObject>> {
        const response = await axiosInstance.get<getTV>(`tv/on_the_air?api_key=${APIkey}&language=ru-RU&page=${page}`)
        return response.data
    },
    async getTopRated(page: number): Promise<GetTVList<TVListObject>> {
        const response = await axiosInstance.get<getTV>(`tv/top_rated?api_key=${APIkey}&language=ru-RU&page=${page}`)
        return response.data
    },
}


export type getSortedTV = {
    mediaType: 'TV'
    initialSorting: 'popular' | 'top-rated' | 'airing-today' | 'on-the-air'
}
export type getSortedMovie = {
    mediaType: 'MOVIE'
    initialSorting: 'popular' | 'now-playing' | 'upcoming' | 'top-rated'
}

export type getSortedMediaArg = getSortedTV | getSortedMovie


export const sortedPageAPI = {
    async getSortedMedia(typeAndSorting: getSortedMediaArg, page: number)
        : Promise<initialSortedData> {
        let result;

        switch (typeAndSorting.mediaType) {
            case 'MOVIE':
                switch (typeAndSorting.initialSorting) {

                    case 'popular':
                        result = await mainPageAPI.getPopularMovies(page)
                        break
                    case 'top-rated':
                        result = await moviesSortAPI.getTopRated(page)
                        break
                    case 'upcoming':
                        result = await moviesSortAPI.getUpcoming(page)
                        break
                    case 'now-playing':
                        result = await moviesSortAPI.getNowPlaying(page)
                        break
                }

                let response = {
                    results: result.results,
                    totalPages: result.total_pages,
                    totalResults: result.total_results,
                    dates: result.dates ? result.dates : null
                }
                return response
            case 'TV':
                switch (typeAndSorting.initialSorting) {
                    case 'popular':
                        result = await mainPageAPI.getPopularTV(page)
                        break
                    case 'top-rated':
                        result = await tvSortAPI.getTopRated(page)
                        break
                    case 'airing-today':
                        result = await tvSortAPI.getAiringToday(page)
                        break
                    case 'on-the-air':
                        result = await tvSortAPI.getOnTheAir(page)
                        break
                }
               let tvResponse = {
                    results: result?.results,
                    totalPages: result?.total_pages,
                    totalResults: result?.total_results,
                    dates: null
                }
                return tvResponse
        }
    },

    async getMoviesSortedBy(MediaType: mediaType, pageSortType: initialSorting | null, page: number,
                            genreSorting: null | number[], additionalSorting: null | sortingType,
                            dateRange: null | dates): Promise<sortedPageData> {


        let dateToday = new Date();
        let dateTodayString = dateToday.toJSON().slice(0,10);
        let todayPlusWeek = dateToday.setDate(dateToday.getDate() + 7);
        let todayPlusWeekString = new Date(todayPlusWeek).toJSON().slice(0,10);

        let sortBy =
            additionalSorting ? `&sort_by=${additionalSorting}` : ``



        const media = MediaType.toLowerCase()


        const topRated =
            pageSortType === `top-rated` ? `&vote_count.gte=300` : ``

        let nowPlaying;

        if (
            (pageSortType === `now-playing` || pageSortType === `upcoming`)
            && dateRange){
            nowPlaying = `&release_date.gte=${dateRange?.minimum}&release_date.lte=${dateRange?.maximum}`
        } else {
            nowPlaying = ``
        }


        let onTheAir;
        if (pageSortType === `on-the-air`) {
            onTheAir = `&air_date.gte=${dateTodayString}&air_date.lte=${todayPlusWeekString}`
        } else if (pageSortType === `airing-today`){
            onTheAir = `&air_date.gte=${dateTodayString}&air_date.lte=${dateTodayString}`
        }
        else {
            onTheAir = ``
        }

        const genres =
            genreSorting ?
                `&with_genres=${genreSorting?.join(`,`)}`
                :
                ``
        const url =
            `discover/${media}?api_key=${APIkey}&language=ru-RU${sortBy}&page=${page}${topRated}${nowPlaying}${genres}${onTheAir}`

        const result = await axiosInstance.get<GetMovieList | GetTVList<TVListObject>>(`${url}`)

        const response = {
            pageData: result.data.results,
            totalPages: result.data.total_pages,
            totalResults: result.data.total_results
        }

        return response
    },

}


export type movieQueryResult = {
    title?:string
    original_title:string
    media_type:'movie'
    id:number
    poster_path : string | null
    overview:string
    release_date:string
}
export type tvQueryResult = {
    original_name:string
    name?:string
    media_type:'tv'
    id:number
    poster_path : string | null
    overview:string
    first_air_date:string
}
export type personQueryResult = {
    name:string
    media_type:'person'
    id:number
    profile_path : string | null
    known_for_department: string
}

export type queryResult = movieQueryResult | tvQueryResult | personQueryResult



type queryResponse<T> = {
    page: number
    results:T[]
    total_results:number
    total_pages:number
}




type Conditional<T> = T extends 'movie' ?  queryResponse<movieQueryResult> : (T extends 'tv' ? queryResponse<tvQueryResult>:queryResponse<personQueryResult>)

export const searchPageAPI = {
    tokens:{
        searchDataToken: null as CancelTokenSource | null
    },

    async getSearchData<T>(queryString:string,page:number,type:T):Promise<Conditional<T>>{

        if (this.tokens.searchDataToken) {
                this.tokens.searchDataToken.cancel('getSearchData request canceled')
            }

            this.tokens.searchDataToken  = axios.CancelToken.source()

            const response = await axiosInstance.get<Conditional<typeof type>>

            (`search/${type}?api_key=${APIkey}&query=${queryString}&language=ru-RU&page=${page}&include_adult=false`,
                {cancelToken:this.tokens.searchDataToken.token})

            return response.data
    },

}
