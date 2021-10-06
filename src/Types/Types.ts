//GENERAL TYPES
export type labels =
    "Популярности (возрастание)" |"Популярности (убывание)"|"Дате выпуска (возрастание)"
    | "Дате выпуска (убывание)" | "Рейтингу (возрастание)" | "Рейтингу (убывание)"

export type mediaType = 'TV' | 'MOVIE'

export type Genre = {
    id: number
    name: string
}


export interface Action {
    type: string
    payload?: any
}

export interface MovieDetails {
    adult: boolean
    backdrop_path: string | null
    belongs_to_collection: null | object
    budget: number
    genres: [
        {
            id: number
            name: string
        }
    ]
    homepage: string | null
    id: number
    imdb_id: string | null
    original_language: string
    original_title: string
    overview: string | null
    popularity: number
    poster_path: string | null
    production_companies: [
        {
            id: number
            logo_path: string | null
            name: string
            origin_country: string
        }
    ]
    production_countries: [
        {
            iso_3166_1: string
            name: string
        }
    ]
    release_date: string
    revenue: number
    runtime: number | null
    spoken_languages: [
        {
            iso_639_1: string
            name: string
        }
    ]
    status: string
    tagline: string | null
    title: string
    video: boolean
    vote_average: number
    vote_count: number

    name?: string //4
    first_air_date?: string //12
}

export interface TVDetails {
    backdrop_path: string | null
    created_by: [
        {
            id: number
            credit_id: string
            name: string
            gender: number
            profile_path: string | null
        }
    ]
    episode_run_time: number[]
    first_air_date: string
    genres: [
        {
            id: number
            name: string
        }
    ]
    homepage: string
    id: number
    in_production: boolean
    languages: string[]
    last_air_date: string
    last_episode_to_air: {
        air_date: string
        episode_number: number
        id: number
        name: string
        overview: string
        production_code: string
        season_number: number
        still_path: string | null
        vote_average: number
        vote_count: number
    }
    name: string
    next_episode_to_air: null
    networks: [
        {
            name: string
            id: number
            logo_path: string | null
            origin_country: string
        }
    ]
    number_of_episodes: number
    number_of_seasons: number
    origin_country: string[]
    original_language: string
    original_name: string
    overview: string
    popularity: number
    poster_path: string | null
    production_companies: [
        {
            id: number
            logo_path: string | null
            name: string
            origin_country: string
        }
    ]
    production_countries: [
        {
            iso_3166_1: string
            name: string
        }
    ]
    seasons: [
        {
            air_date: string
            episode_count: number
            id: number
            name: string
            overview: string
            poster_path: string
            season_number: number
        }
    ]
    spoken_languages: [
        {
            english_name: string
            iso_639_1: string
            name: string
        }
    ]
    status: string
    tagline: string
    type: string
    vote_average: number
    vote_count: number
    title?: string
    release_date?: string

}

export type TVandMovieDetails = {
    created_by?: [
        {
            id: number
            credit_id: string
            name: string
            gender: number
            profile_path: string | null
        }
    ]
    episode_run_time?: number[]
    in_production?: boolean
    languages?: string[]
    last_air_date?: string
    last_episode_to_air?: {
        air_date: string
        episode_number: number
        id: number
        name: string
        overview: string
        production_code: string
        season_number: number
        still_path: string | null
        vote_average: number
        vote_count: number
    }
    next_episode_to_air?: null
    networks?: [
        {
            name: string
            id: number
            logo_path: string | null
            origin_country: string
        }
    ]
    number_of_episodes?: number
    number_of_seasons?: number
    origin_country?: string[]
    original_name?: string
    seasons?: [
        {
            air_date: string
            episode_count: number
            id: number
            name: string
            overview: string
            poster_path: string
            season_number: number
        }
    ]
    type?: string
    adult?: boolean
    backdrop_path: string | null
    belongs_to_collection?: null | object
    budget?: number
    genres: [
        {
            id: number
            name: string
        }
    ]
    homepage: string | null
    id: number
    imdb_id?: string | null
    original_language: string
    original_title?: string
    overview: string | null
    popularity: number
    poster_path: string | null
    production_companies: [
        {
            id: number
            logo_path: string | null
            name: string
            origin_country: string
        }
    ]
    production_countries: [
        {
            iso_3166_1: string
            name: string
        }
    ]
    release_date?: string
    revenue?: number
    runtime?: number | null
    spoken_languages: [
        {
            iso_639_1: string
            name: string
        }
    ]
    status: string
    tagline: string | null
    title?: string
    video?: boolean
    vote_average: number
    vote_count: number

    name?: string //4
    first_air_date?: string //12
}

export interface MovieListObject {
    id: number //1
    poster_path: string | null //2
    backdrop_path: string | null, //3
    title: string //4
    original_title: string //5
    vote_count: number //6
    original_language: string //7
    popularity: number //8
    genre_ids: number[] //9
    vote_average: number //10
    overview: string //11
    release_date: string //12
    video: boolean
    adult: boolean
    first_air_date?: string //12
    origin_country?: string[]
}

export interface TVListObject {
    id: number //1
    poster_path: string | null //2
    backdrop_path: string | null //3
    name: string //4
    original_name: string //5
    vote_count: number //6
    original_language: string //7
    popularity: number //8
    genre_ids: number[] //9
    vote_average: number //10
    overview: string //11
    first_air_date: string //12
    origin_country: string[]
}

export interface GetTVList<T> {
    page: number
    results: T[]
    total_pages: number
    total_results: number
}

export type dates = {
    maximum: string
    minimum: string
}

export interface GetMovieList extends GetTVList<MovieListObject> {
    dates?: dates
}


// MOVIE PAGE REDUCER

export type Actor = {
    adult: boolean
    gender: number | null
    id: number
    known_for_department: string
    name: string
    popularity: number
    profile_path: string | null
    character: string
}
export type CrewMember = {
    adult: boolean
    gender: number | null
    id: number
    known_for_department: string
    name: string
    original_name: string
    popularity: number
    profile_path: string | null
    credit_id: string
    department: string
    job: string

}

//CONFIGURATION REDUCER
export type Config = {
    images: {
        base_url: string
        secure_base_url: string
        backdrop_sizes: string[]
        still_sizes: string[]
        logo_sizes: string []
        profile_sizes: string[]
        poster_sizes: string []
    },
    change_keys: string[]
}


//AUTHORIZATION REDUCER
export interface AuthStateInterface {
    Authorized: boolean
    userInfo: IUserInfo | null
    session_id: string
}

//------------------------------------------------
export enum AuthReducerActions {
    AUTH_TOGGLE = 'AUTH_TOGGLE',
    SET_USERS_INFO = 'SET_USERS_INFO',
    LOGOUT = 'LOGOUT',
    SET_SESSION_ID = 'SET_SESSION_ID'
}

//------------------------------------------------

export type AuthToggleAction = {
    type: AuthReducerActions.AUTH_TOGGLE
}
export type AuthSetUserAction = {
    type: AuthReducerActions.SET_USERS_INFO
    payload: IUserInfo
}
export type AuthLogoutAction = {
    type: AuthReducerActions.LOGOUT
}
export type AuthSetSessionIdAction = {
    type: AuthReducerActions.SET_SESSION_ID
    payload: {
        session_id: string
    }
}
//------------------------------------------------

//MAIN PAGE  REDUCER

export enum mainPageReducerActions {
    FETCH_POPULAR_MOVIES = 'FETCH_POPULAR_MOVIES',
    FETCH_POPULAR_TV = 'FETCH_POPULAR_TV',
    FETCH_TRENDING_MOVIES_DAY = 'FETCH_TRENDING_MOVIES_DAY',
    FETCH_TRENDING_MOVIES_WEEK = 'FETCH_TRENDING_MOVIES_WEEK',
    FETCH_TRENDING_TV_DAY = 'FETCH_TRENDING_TV_DAY',
    FETCH_TRENDING_TV_WEEK = 'FETCH_TRENDING_TV_WEEK',
    FETCH_TRAILERS = 'FETCH_TRAILERS'
}

//------------------------------------------------
export type setPopularMoviesAction = {
    type: mainPageReducerActions.FETCH_POPULAR_MOVIES,
    payload: MovieListObject[]
}
export type setPopularTVAction = {
    type: mainPageReducerActions.FETCH_POPULAR_TV
    payload: TVListObject[]
}

export type setDayTrendingMoviesAction = {
    type: mainPageReducerActions.FETCH_TRENDING_MOVIES_DAY
    payload: MovieListObject[] | MovieDetails[]
}
export type setWeekTrendingMoviesAction = {
    type: mainPageReducerActions.FETCH_TRENDING_MOVIES_WEEK
    payload: MovieListObject[] | MovieDetails[]
}
export type setDayTrendingTVAction = {
    type: mainPageReducerActions.FETCH_TRENDING_TV_DAY
    payload: TVListObject[] | TVDetails[]
}
export type setWeekTrendingTVAction = {
    type: mainPageReducerActions.FETCH_TRENDING_TV_WEEK
    payload: TVListObject[] | TVDetails[]
}
export type setTrailersAction = {
    type: mainPageReducerActions.FETCH_TRAILERS
    payload: videoListResultObject[]
}

//------------------------------------------------
export interface mainPageState {
    popularBar: {
        movies: MovieListObject[],
        tv: TVListObject[]
    }
    trendingBarDay: {
        movies: MovieListObject[] | MovieDetails[],
        tv: TVListObject[] | TVDetails[]
    }
    trendingBarWeek: {
        movies: MovieListObject[] | MovieDetails[],
        tv: TVListObject[] | TVDetails[]
    }
    trailerBar: videoListResultObject[]
}


//CONFIGURATION API
export interface APIConfigState {
    images: {
        base_url: string
        secure_base_url: string
        backdrop_sizes: string[]
        logo_sizes: string[]
        poster_sizes: string[]
        profile_sizes: string[]
        still_sizes: string[]
    },
    change_keys: string[]
    tvGenres: Genre[]
    movieGenres: Genre[]
}
export type GenreResponse = {
    genres:Genre[]
}

//AUTHORIZATION API
export interface IToken extends IgetToken, IAuthErr {
}

export interface ISessionRequest extends ISession, IAuthErr {

}

interface IgetToken {
    success: boolean
    expires_at: string
    request_token: string
}

interface IAuthErr {
    success: boolean
    status_code: number
    status_message: string
}

interface ISession {
    session_id: string
}

export interface ILogout {
    success?: boolean
    status_code?: number
    status_message?: string
}

//USER API

export interface IUserInfo {
    avatar: {
        gravatar: {
            hash: string
        }
    }
    id: number
    iso_639_1: string
    iso_3166_1: string
    name: string
    include_adult: boolean
    username: string
}

//MAIN PAGE API

export interface getMovies extends GetMovieList {
    status_message?: string
    status_code?: number
}

export interface getTV extends GetTVList<TVListObject> {
    status_message?: string
    status_code?: number
}

//MOVIE PAGE API

export type MovieRecomendations = {
    page: number
    results: MovieListObject[]
    total_pages: number
    total_results: number
}
export type TVRecomendations = {
    page: number
    results: TVListObject[]
    total_pages: number
    total_results: number
}


export type ActorsAndCrew = {
    cast: Actor[]
    crew: CrewMember[]
}

//MAIN PAGE

export interface MovieBarData {
    id: number //1
    poster_path: string | null //2
    backdrop_path: string | null, //3
    title?: string //4
    original_title?: string //5
    name?: string //4
    original_name?: string //5
    vote_count: number //6
    original_language: string //7
    popularity: number //8
    genre_ids: number[] //9
    vote_average: number //10
    overview: string //11
    release_date?: string //12
    video?: boolean
    adult?: boolean
    first_air_date?: string //12
    origin_country?: string[]
}

//LOGIN FORM

export type LoginData = {
    username: string
    password: string
}


//MOVIES && TV DATA
export type videoResponse = {
    id: number,
    results: videoListResultObject[]
}
export type videoListResultObject = {
    name: string
    key: string
    site: string
    iso_639_1: string
    iso_3166_1: string
    size: number
    type: string
    official: boolean
    published_at: string
    id: string
}

// PERSON PAGE API

export type personDetails = {
    birthday: string | null
    known_for_department: string
    deathday: null | string
    id: number
    name: string
    gender: number
    biography: string
    place_of_birth: string | null
    profile_path: string | null
}
export type movieAndTVCredits = {
    id: number
    original_language: string
    episode_count: number
    overview: string
    genre_ids: number[]
    name: string
    media_type: mediaType
    poster_path: string | null
    first_air_date: string
    vote_average: number
    vote_count: number
    character: string
    backdrop_path: string | null
    popularity: number
    credit_id: string
    original_title: string
    video: boolean
    release_date: string
    title: string

}
export type crewCredits = {
    id: number
    department: string
    original_language: string
    episode_count: number
    job: string
    overview: string
    origin_country: string[]
    original_name: string
    vote_count: number
    name: string
    media_type: mediaType
    popularity: number
    credit_id: string
    backdrop_path: string | null
    first_air_date: string
    vote_average: number
    genre_ids: string[]
    poster_path: string | null
    original_title: string
    video: boolean
    title: string
    release_date: string
}
export type personCredits = {
    cast: movieAndTVCredits[]
    crew: crewCredits[]
}


//PERSON PAGE
export type CreditsData = {
    id: number
    title: string
    job?: string
    department: string
    character?: string
    date: string
    episodeCount?: number
    media_type: mediaType
}