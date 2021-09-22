import React, {FC} from 'react';
import MoviesBar from "../../MainPage/MoviesSection/MoviesBar/MoviesBar";
import Credits from "./Credits/Credits";
import {MovieBarData, personCredits, crewCredits, movieAndTVCredits, CreditsData} from "../../../Types/Types";
import styles from './BiographySection.module.css';

type BiographySectionProps = {
    credits?: personCredits | null
    baseUrl: string
    name?: string
    biography?: string
}


const BiographySection: FC<BiographySectionProps> = ({credits, baseUrl, name, biography}) => {

    let movieBarData = credits?.cast as unknown as MovieBarData[];

    let formatedCredits:CreditsData[]|null = null;

    if (credits?.cast){
       const formatedCast:CreditsData[] = credits?.cast.map(el => ({
            id:el.id,
            title:el.title || el.name,
            department:'acting',
            character:el.character,
            episodeCount:el.episode_count,
            date:el.first_air_date||el.release_date,
            media_type:el.media_type
        }))
       const formaredCrew:CreditsData[] = credits.crew.map(el=>({
            id:el.id,
            title:el.title || el.name,
            department:el.department,
            episodeCount:el.episode_count,
            date:el.first_air_date||el.release_date,
            media_type:el.media_type
        }))
        formatedCredits = formatedCast.concat(formaredCrew);
    }



    return (

        <div className={styles.section_wrapper}>
            <h1>{name}</h1>
            <p>{biography}</p>
            <div style={{
                width: '100%',
                overflow: "hidden"
            }}>
                {movieBarData && <MoviesBar data={movieBarData} imgBaseUrl={baseUrl}/>}
            </div>
                {formatedCredits && <Credits credits={formatedCredits}/>}
        </div>
    );
};

export default BiographySection;