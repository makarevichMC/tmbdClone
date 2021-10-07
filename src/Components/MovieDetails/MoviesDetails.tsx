import React, {FC, useEffect} from 'react';
import BackgroundSection from "./BackgroundSection/BackgroundSection";
import {Actor, CrewMember, MovieBarData, MovieDetails} from "../../Types/Types";

import {usePalette} from 'react-palette'
import ActorsBar from "./ActorsBar/ActorsBar";
import Recomendations from "./Recomendations/Recomendations";
import {TVandMovieDetails} from "../../Utils/Utils";


type MoviesDetailsProps = {
    baseProfileUrl: string
    baseBackdropUrl: string
    backDropUrl?: string | null
    movieDetails: TVandMovieDetails | null
    mainImageUrl: string
    posterPath?: string | null
    actors: Actor[]
    crew: CrewMember[]
    recomendations:MovieBarData[]
}


const MoviesDetails: FC<MoviesDetailsProps> = (props) => {

    let backgroundURL = props.baseBackdropUrl + props.backDropUrl;
    let posterUrl = props.mainImageUrl + props.posterPath;


    // console.log(props.baseBackdropUrl, props.posterPath) // undefined undefined PRELOADER

    const {data, loading} = usePalette(posterUrl)

    let details = props.movieDetails
    let genres = details?.genres ? details.genres : []
    let runtime = details?.runtime ? details.runtime : ''
    let rating = details?.raiting ? details.raiting : 0

    return (
        props.movieDetails ?
        <div>
            <BackgroundSection posterUrl={posterUrl} backgorundURL={backgroundURL} rating={rating}
                               title={details?.title} release_date={details?.release_date}
                               genres={genres} overview={details?.overview}
                               director={'DIRECTOR'} writer={'WRITERT'} tagline={details?.tagline}
                               runtime={runtime}
                               backgroundColor={ data.muted && data.vibrant && data.darkVibrant &&
                               data.lightVibrant && data.lightMuted && data.darkMuted
                                   ? [data.darkMuted] : []}/>

            <ActorsBar id={props.movieDetails?.id} title={'В главных ролях'} actors={props.actors} baseUrl={props.baseProfileUrl}/>

            <Recomendations baseUrl={props.mainImageUrl} recomendationsData={props.recomendations}/>
        </div>
            :
            <div>LOADING....</div>
    );
};

export default MoviesDetails;