import {labels, mediaType, MovieDetails, TVDetails} from '../Types/Types';
import {getSortedMediaArg} from '../API/api';
import {initialSorting, sortingType} from '../redux/reducers/SortedMoviesPageReducer';


export   const hexToRGB = (hex: Array<string>, alpha: number) => {

    if (hex.some(el=>el===undefined)) return
    else {
        let length = hex.length;
        let redSumm = 0, greenSumm = 0, blueSumm = 0;
        for (let el of hex){
            redSumm += parseInt(el.slice(1,3),16);
            greenSumm += parseInt(el.slice(3,5),16);
            blueSumm += parseInt(el.slice(5,7),16);
        }
        return `rgba(${redSumm/length}, ${greenSumm/length}, ${blueSumm/length}, ${alpha})`;
    }
}

export const deepEqual = (x:any,y:any) => {
    if (x===y)  return true

    if (typeof x !== 'object' || typeof y !== 'object' || x===null||y ===null) return false

    for (let prop in x){
        if (x[prop]===y[prop]) continue
        if (typeof x !== 'object' || typeof y !== 'object' || x===null||y ===null) return false
        else if (deepEqual(x[prop],y[prop])) continue
        else return false
    }
    return true
}

export const convertMediaType = (type:mediaType,dataType:initialSorting):getSortedMediaArg => {

    switch (type) {
        case 'TV':
            let tvSorting = dataType as  'popular' | 'top-rated' | 'airing-today' | 'on-the-air'
            return {
                mediaType:type,
                initialSorting:tvSorting
            }

        case 'MOVIE':
            let movieSorting = dataType as  'popular' | 'top-rated' | 'now-playing' | 'upcoming'
            return {
                mediaType:type,
                initialSorting:movieSorting
            }
    }
}


export const filterToLabel = (filter:sortingType):labels =>{
    switch (filter) {
        case "popularity.asc":
            return "Популярности (возрастание)"
        case "popularity.desc":
            return "Популярности (убывание)"
        case "first_air_date.asc":
        case "primary_release_date.asc":
            return "Дате выпуска (возрастание)"
        case "first_air_date.desc":
        case "primary_release_date.desc":
            return "Дате выпуска (убывание)"
        case "vote_average.asc":
            return "Рейтингу (возрастание)"
        case "vote_average.desc":
            return "Рейтингу (убывание)"
    }
}


export const LabelToFilter = (label:labels,mediaType:mediaType):sortingType => {
    switch (label) {
        case "Популярности (возрастание)":
            return "popularity.asc"
        case "Популярности (убывание)":
            return "popularity.desc"
        case "Рейтингу (возрастание)":
            return "vote_average.asc"
        case "Рейтингу (убывание)":
            return "vote_average.desc"
        case "Дате выпуска (возрастание)":
            if(mediaType==="TV"){
                return "first_air_date.asc"
            } else {
                return "primary_release_date.asc"
            }
        case "Дате выпуска (убывание)":
            if(mediaType==="TV"){
                return "first_air_date.desc"
            } else {
                return "primary_release_date.desc"
            }
    }
}
export const divideStyleSizeBy = (size:string,divider:number):string =>{
    const numValue = /\d+/.exec(size)![0]
    const sign = /\D+/.exec(size)![0]
    const result = (Number(numValue) /divider).toString() + sign
    return result
}

export const uniqueFunc = (arr: any[]) => {
    if (arr.length===0) return null
    let uniqueArr = [arr[0]]
    for (let i = 1; i < arr.length; i++) {
        if (uniqueArr.some(uniqueItem => {
            return uniqueItem.id === arr[i].id
        })) continue
        uniqueArr.push(arr[i])
    }
    return uniqueArr
}

export type TVandMovieDetails = {
    backdrop_path:string|null
    genres:string[]
    raiting:number
    runtime:string | null
    belongs_to_collection: null | object
    id: number
    original_language: string
    original_title: string
    overview: string | null
    popularity: number
    poster_path: string | null
    release_date: string
    status: string
    tagline: string | null
    title: string
    video?: boolean
    vote_count: number
    name?: string //4
    first_air_date?: string //12

}


export const convertMovieDetailsType = (movie:MovieDetails):TVandMovieDetails=>{
    let detailsType = {} as TVandMovieDetails

    let genres = movie?.genres.map(el => { //DONE
        return el.name
    });
    let runtime;
    let rating = movie?.vote_average || 0; //DONE
    if (movie?.runtime) {
        let hours: number | null = Math.floor(movie.runtime / 60);
        let minutes = movie.runtime - hours * 60;
        if (hours < 1) hours = null;
        else {
            minutes = movie.runtime - hours * 60;
        }
        runtime = hours ? `${hours}h ${minutes}m` : `${minutes}m` //DONE
    }else{
        runtime = null
    }

    detailsType.genres = genres
    detailsType.runtime=runtime
    detailsType.raiting = rating
    detailsType.backdrop_path = movie.backdrop_path
    detailsType.genres = genres
    detailsType.runtime=runtime
    detailsType.raiting = rating
    detailsType.backdrop_path = movie.backdrop_path
    detailsType.belongs_to_collection = movie.belongs_to_collection
    detailsType.id = movie.id
    detailsType.original_language = movie.original_language
    detailsType.original_title = movie.original_title
    detailsType.overview = movie.overview
    detailsType.popularity = movie.popularity
    detailsType.poster_path = movie.poster_path
    detailsType.release_date = movie.release_date
    detailsType.status = movie.status
    detailsType.tagline = movie.tagline
    detailsType.title = movie.title
    detailsType.video = movie.video
    detailsType.vote_count = movie.vote_count

    return detailsType
}

export const convertTVDetailsType = (tv:TVDetails):TVandMovieDetails=>{
    let detailsType = {} as TVandMovieDetails

    let genres = tv?.genres.map(el => {
        return el.name
    });
    let runtime;
    let rating = tv?.vote_average || 0;
    if (tv.episode_run_time.length>0) {
        runtime = Math.ceil(tv.episode_run_time.
        reduce((el1,el2)=>el1+el2,0)/tv.episode_run_time.length)

        let hours: number | null = Math.floor( runtime / 60);
        let minutes = runtime - hours * 60;
        if (hours < 1) hours = null;
        else {
            minutes = runtime - hours * 60;
        }
        runtime = hours ? `${hours}h ${minutes}m` : `${minutes}m`
    }else{
        runtime = null
    }

    detailsType.genres = genres
    detailsType.runtime=runtime
    detailsType.raiting = rating
    detailsType.backdrop_path = tv.backdrop_path
    detailsType.genres = genres
    detailsType.runtime=runtime
    detailsType.raiting = rating
    detailsType.backdrop_path = tv.backdrop_path
    detailsType.id = tv.id
    detailsType.original_language = tv.original_language
    detailsType.original_title = tv.original_name
    detailsType.overview = tv.overview
    detailsType.popularity = tv.popularity
    detailsType.poster_path = tv.poster_path
    detailsType.release_date = tv.first_air_date
    detailsType.status = tv.status
    detailsType.tagline = tv.tagline
    detailsType.title = tv.name
    detailsType.vote_count = tv.vote_count

    return detailsType
}

export const backgroundUrls =
    ['34OGjFEbHj0E3lE2w0iTUVq0CBz.jpg,hreiLoPysWG79TsyQgMzFKaOTF5.jpg,uozb2VeD87YmhoUP1RrGWfzuCrr.jpg',
        '5GISMqlRXMEyBrgEqyvhaMMuQmJ.jpg','bcT8CaBIj086WVD7K529h78eujb.jpg','6LfVuZBiOOCtqch5Ukspjb9y0EB.jpg',
        'zqkmTXzjkAgXmEWLRsY4UpTWCeo.jpg','qJxzjUjCpTPvDHldNnlbRC4OqEh.jpg','iDbIEpCM9nhoayUDTwqFL1iVwzb.jpg',
        'r2NcIZ1FPMlxCty3vRITVTgGNVS.jpg','kf456ZqeC45XTvo6W9pW5clYKfQ.jpg','8bcoRX3hQRHufLPSDREdvr3YMXx.jpg',
        'tlEFuIlaxRPXIYVHXbOSAMCfWqk.jpg','hPea3Qy5Gd6z4kJLUruBbwAH8Rm.jpg','kSNojkWwSZWsYv0Xj1gcq88okzY.jpg',
        '/jTiQAusGG4dVLSb1WHme9I9R4NN.jpg']


export const pickRandomFromArray = <T extends unknown>(arr:Array<T>,exceptFor?:T):T => {
    let array = [...arr]
    if (exceptFor!== undefined){
        array = array.filter(el=>el!==exceptFor)
    }
    let index = Math.floor(Math.random()*array.length)
    return array[index]
}