import React, {FC} from 'react';
import MoviesBar from '../../MainPage/MoviesSection/MoviesBar/MoviesBar';
import {MovieBarData, personCredits, crewCredits, movieAndTVCredits, CreditsData} from "../../../Types/Types";
import styles from './BiographySection.module.css';
import ReadMore from "../../Common/ReadMore/ReadMore";

type BiographySectionProps = {
    credits?: personCredits | null
    baseUrl: string
    name?: string
    biography?: string
}


const BiographySection: FC<BiographySectionProps> = ({credits, baseUrl, name, biography}) => {


    let movieBarData = credits?.cast as unknown as MovieBarData[];

    return (
        <div className={styles.section_wrapper}>
            <h1>{name}</h1>
                {biography && <ReadMore text={biography} visibleLength={400}/>}
                {movieBarData && <MoviesBar data={movieBarData} imgBaseUrl={baseUrl}/>}
        </div>
    );
};

export default BiographySection;