import React, {FC} from 'react';
// @ts-ignore
import styles from './PersonPage.module.css';
import {personCredits, personDetails} from "../../Types/Types";
import PhotoAndInfo from "./PhotoAndInfo/PhotoAndInfo";
import BiographySection from "./BiographySection/BiographySection";


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

            </div>

    );
};

export default PersonPage;