import React, {FC} from 'react';
// @ts-ignore
import styles from './PersonPage.module.css';
import {CreditsData, personCredits, personDetails} from '../../Types/Types';
import PhotoAndInfo from './PhotoAndInfo/PhotoAndInfo';
import BiographySection from './BiographySection/BiographySection';
import Credits from './BiographySection/Credits/Credits';



type PersonPageProps = {
    personInfo?: personDetails | null
    personCredits?: personCredits | null
    isLoading: boolean
    photoBaseUrl: string
    movieBarBaseUrl: string
}


const PersonPage: FC<PersonPageProps> = (props) => {

    let gender;
    props.personInfo?.gender == 0 ? gender = 'Мужской' : gender = 'Женский';

    let projectsCount =
        (props.personCredits?.cast ? props.personCredits.cast.length : 0) +
        (props.personCredits?.crew ? props.personCredits.crew.length : 0)

    let photoUrl;
    if (props.personInfo?.profile_path) {
        photoUrl = props.photoBaseUrl + props.personInfo?.profile_path;
    }

    let formatedCredits:CreditsData[]|null = null;

    if (props.personCredits?.cast){
        const formatedCast:CreditsData[] = props.personCredits?.cast.map(el => ({
            id:el.id,
            title:el.title || el.name,
            department:'acting',
            character:el.character,
            episodeCount:el.episode_count,
            date:el.first_air_date||el.release_date,
            media_type:el.media_type
        }))
        const formatedCrew:CreditsData[] = props.personCredits.crew.map(el=>({
            id:el.id,
            title:el.title || el.name,
            department:el.department,
            episodeCount:el.episode_count,
            date:el.first_air_date||el.release_date,
            media_type:el.media_type
        }))

        formatedCredits = formatedCast.concat(formatedCrew)
            .filter(el=>el.date)
            .sort((el1,el2)=>{
            let firstDate = Number(el1.date.slice(0,4));
            let secondDate = Number(el2.date.slice(0,4));
            return secondDate - firstDate
        });
    }

    return (
        props.isLoading ?
            <div>{'LOADING'}</div>
            :
            <div className={styles.page_wrapper}>
                <PhotoAndInfo
                    knownFor={props.personInfo?.known_for_department} birthday={props.personInfo?.birthday}
                    gender={gender} place_of_birth={props.personInfo?.place_of_birth} projectsCount={projectsCount}
                    url={photoUrl}/>
                <BiographySection
                    credits={props.personCredits} baseUrl={props.movieBarBaseUrl}
                    name={props.personInfo?.name} biography={props.personInfo?.biography}/>

                    {formatedCredits && <Credits credits={formatedCredits}/>}
            </div>


    );
};

export default PersonPage;