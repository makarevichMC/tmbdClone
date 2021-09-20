import React, {FC} from 'react';
import BackgroundSection from "./BackgroundSection/BackgroundSection";
import {Actor, CrewMember, MovieBarData, MovieDetails} from "../../Types/Types";
// import { getColorFromURL } from 'color-thief-node';
// import Color, {useColor} from 'color-thief-react';
import {usePalette} from 'react-palette'
import ActorsBar from "./ActorsBar/ActorsBar";
import Recomendations from "./Recomendations/Recomendations";


type MoviesDetailsProps = {
    baseProfileUrl: string
    baseBackdropUrl: string
    backDropUrl?: string | null
    movieDetails: MovieDetails | null
    mainImageUrl: string
    posterPath?: string | null
    actors: Actor[]
    crew: CrewMember[]
    recomendations:MovieBarData[]
}


const MoviesDetails: FC<MoviesDetailsProps> = (props) => {

    let backgroundURL = props.baseBackdropUrl + props.backDropUrl;
    let posterUrl = props.mainImageUrl + props.posterPath;


    console.log(props.baseBackdropUrl, props.posterPath) // undefined undefined PRELOADER

    const {data, loading} = usePalette(posterUrl);


    let details = props.movieDetails;
    let genres = details?.genres.map(el => {
        return el.name
    });
    let runtime;
    let rating = details?.vote_average || 0;
    if (details?.runtime) {
        let hours: number | null = Math.floor(details.runtime / 60);
        let minutes = details.runtime - hours * 60;
        if (hours < 1) hours = null;
        else {
            minutes = details.runtime - hours * 60;
        }
        runtime = hours ? `${hours}h ${minutes}m` : `${minutes}m`
    }

    return (
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
    );
};

export default MoviesDetails;