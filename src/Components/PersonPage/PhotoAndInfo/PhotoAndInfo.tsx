import React, {FC} from 'react';
// @ts-ignore
import styles from './PhotoAndInfo.module.css';



type PhotoAndInfoProps = {
    knownFor:string
    birthday: string
    gender:string
    place_of_birth:string
    projectsCount:number
    url:string
}

const PhotoAndInfo:FC<PhotoAndInfoProps> = ({knownFor,birthday,place_of_birth,gender,projectsCount,url}) => {
    return (
        <div className={styles.image_and_info}>
            <div className={styles.image}>
                    <img src={url} alt=""/>
            </div>
            <div className={styles.info}>
                <h4>Персональная информация</h4>
                <div>
                    <span>Известность за</span>
                    {knownFor}
                </div>
                <div>
                    <span>Число проектов </span>
                    {projectsCount}
                </div>
                <div>
                    <span>Пол</span>
                    {gender}
                </div>
                <div>
                    <span>Дата рождения</span>
                    {birthday}
                </div>
                <div>
                    <span>Место рождения</span>
                    {place_of_birth}
                </div>
            </div>
        </div>
    );
};

export default PhotoAndInfo;