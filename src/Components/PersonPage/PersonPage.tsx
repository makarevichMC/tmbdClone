import React, {FC} from 'react';
// @ts-ignore
import styles from './PersonPage.module.css';
import {personCredits, personDetails} from "../../Types/Types";
import PhotoAndInfo from "./PhotoAndInfo/PhotoAndInfo";

type PersonPageProps = {
    personInfo?:personDetails|null
    personCredits?:personCredits|null
}


const PersonPage:FC<PersonPageProps> = ({personInfo,personCredits}) => {

    return (
        <div className={styles.page_wrapper}>
            {/*<PhotoAndInfo knownFor={personInfo?.known_for_department} birthday={} gender={} place_of_birth={} projectsCount={} url={}/>*/}
        </div>
    );
};

export default PersonPage;