import React, {FC} from 'react';
import {NavLink} from 'react-router-dom';
import styles from './ActorCard.module.css';

type ActorCardProps = {
    id: number
    photoUrl: string
    name: string
    character: string
}

const ActorCard: FC<ActorCardProps> = ({id, photoUrl, name, character}) => {
    return (
        <div className={styles.content}>
            <NavLink to={`/person/${id}`}>
                <img height={278} width={175} src={photoUrl} alt="#"/>
                <span>{name}</span>
            </NavLink>
            <p>{character}</p>
        </div>
    );
};

export default ActorCard;