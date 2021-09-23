import axios from 'axios';
import {
    ActorsAndCrew,
    APIConfig,
    GetMovieList,
    getMovies,
    getTV,
    GetTVList,
    ILogout,
    ISessionRequest,
    IToken,
    IUserInfo,
    MovieDetails,
    MovieRecomendations, personCredits,
    personDetails,
    TVDetails,
    TVListObject,
    TVRecomendations,
    videoResponse
} from "../Types/Types";


const APIkey: string = '771d51cfcca51d5e93afff45320fea02';


let axiosInstance = axios.create({
    baseURL: 'https://api.themoviedb.org/3/',
})

//CONFIGURATION API

export const getConfigurationAPI = async ():Promise<APIConfig> => {
    try{
        let response = await axiosInstance.get<APIConfig>(`https://api.themoviedb.org/3/configuration?api_key=${APIkey}`);
        return response.data;
    }
    catch (e:any) {
            return e.response.data;
    }
}

export const query = async () => {
    try{
        let response = await axiosInstance.get(`https://api.themoviedb.org/3/search/movie?api_key=${APIkey}&query=Сус`);
        return response.data;
    }
    catch (e:any) {
        return e.response.data;
    }
}


//AUTHORIZATION API

export const AuthorizationAPI = {
    async getToken(): Promise<IToken> {
        try {
            let response = await axiosInstance.get<IToken>(`authentication/token/new?api_key=${APIkey}`);
            return response.data;
        } catch (e:any) {
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
        } catch (e:any) {
            return e.response.data;
        }

    },
    async CreateNewSession(request_token: string): Promise<ISessionRequest> {
        try {
            let response = await axiosInstance.post<ISessionRequest>(`authentication/session/new?api_key=${APIkey}`, {request_token})
            console.log(response)
            return response.data
        } catch (e:any) {
            return e.response.data
        }
    },
    async DeleteSession(session_id:string):Promise<ILogout>{
        try {
            let response = await axiosInstance.delete<ILogout>(`authentication/session?api_key=${APIkey}`,{data:{session_id}});
            console.log(response.data)
            return response.data
        }
        catch (e:any) {
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
                "media_type": "movie",
                "media_id": 551,
                "favorite": true
            },
            {headers: {'Content-Type': 'application/json;charset=utf-8'}})
            .then(resonse => console.log(resonse))
    }

}

//MAIN PAGE API

export const mainPageAPI = {
    async getPopularMovies(page:number):Promise<GetMovieList>{
        const response = await axiosInstance.get<getMovies>(`movie/popular?api_key=${APIkey}&language=ru-RU&page=${page}`);
        return response.data
    },
    async getTrendingMovies(this_day?:boolean):Promise<GetMovieList>{
        let time_window = 'week';
        if (this_day) time_window = 'day';
        const response = await axiosInstance.get<getMovies>(`/trending/movie/${time_window}?api_key=${APIkey}`);
        return response.data
    },
    async getPopularTV(page:number):Promise<GetTVList<TVListObject>>{
        const response = await axiosInstance.get<getTV>(`tv/popular?api_key=${APIkey}&language=ru-RU&page=${page}`);
        return response.data
    },
    async getTrendingTV(this_day?:boolean):Promise<GetTVList<TVListObject>>{
        let time_window = 'week';
        if (this_day) time_window = 'day';
        const response = await axiosInstance.get<getTV>(`trending/tv/${time_window}?api_key=${APIkey}`);
        return response.data
    },
    async getTrailerMovies():Promise<getMovies>{
        const response = await axiosInstance.get<getMovies>(`discover/movie?api_key=${APIkey}&language=ru-RU&region=RU&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&primary_release_date.gte=2021-07-06&primary_release_date.lte=2021-09-06&with_watch_monetization_types=rent`);
        return response.data
    },

}

//MOVIE INFO API

export const movieInfoAPI = {
    async getVideos(id:number):Promise<videoResponse>{
        const response = await axiosInstance.get<videoResponse>(`/movie/${id}/videos?api_key=${APIkey}&language=ru-RU`);
        return response.data
    },
    async getMovieDetails(id:number):Promise<MovieDetails>{
        const response = await axiosInstance.get<MovieDetails>(`movie/${id}?api_key=${APIkey}&language=ru-RU`);
        return response.data
    },
    async getActorsAndCrew(id:number):Promise<ActorsAndCrew>{
        const response = await axiosInstance.get<ActorsAndCrew>(`movie/${id}/credits?api_key=${APIkey}&language=ru-RU`);
        return response.data
    },
    async getMovieRecomendations(id:number):Promise<MovieRecomendations>{
        const response = await axiosInstance.get<MovieRecomendations>(`movie/${id}/recommendations?api_key=${APIkey}&language=ru-RU&page=1`);
        return response.data
    }

}

//TV INFO API

export const tvInfoAPI = {
    async getVideos(id:number):Promise<videoResponse>{
        const response = await axiosInstance.get<videoResponse>(`tv/${id}/videos?api_key=${APIkey}&language=ru-RU`);
        return response.data
    },
    async getTVDetails(id:number):Promise<TVDetails>{
        const response = await axiosInstance.get<TVDetails>(`tv/${id}?api_key=${APIkey}&language=ru-RU`);
        return response.data
    },
    async getTVRecomendations(id:number):Promise<TVRecomendations>{
        const response = await axiosInstance.get<TVRecomendations>(`movie/${id}/recommendations?api_key=${APIkey}&language=ru-RU&page=1`);
        return response.data
    }
}

//PERSON PAGE API

export const personPageAPI = {
    async getPersonInfo(id:number):Promise<personDetails>{
        const response = await axiosInstance.get<personDetails>(`person/${id}?api_key=${APIkey}&language=ru-RU`);
        return response.data
    },
    async getPersonCredits(id:number):Promise<personCredits> {
        const response = await axiosInstance.get<personCredits>(`person/${id}/combined_credits?api_key=${APIkey}&language=ru-RU`);
        return response.data
    }
}
