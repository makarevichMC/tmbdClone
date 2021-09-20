import React, {FC} from 'react';
import {Actor} from '../../../Types/Types';
import ActorCard from './ActorCard/ActorCard';
import styles from './ActorsBar.module.css';
import {ReactComponent as Arrow} from '../../../images/right-arrow.svg'
import {NavLink} from 'react-router-dom';
import defaultProfile from '../../../images/DefaultProfile.png';

type ActorsBarProps = {
    actors: Actor[]
    baseUrl: string
    title: string
    id?:number
}

const ActorsBar: FC<ActorsBarProps> = ({actors, baseUrl, title,id}) => {

    const cards = actors.map((actor, i) => {
        if (i > 9) return
        const url =  actor.profile_path ? baseUrl + actor.profile_path : defaultProfile ;

        return (
            <div className={styles.card_item} key={actor.id}>
                <ActorCard
                    id={actor.id} photoUrl={url}
                    name={actor.name} character={actor.character}/>
            </div>
        )


    })

    return (
        <>
            <h3 className={styles.title}>{title}</h3>
            <div className={styles.cards_wrapper}>
                {cards}
                <div className={styles.get_more}>
                    <NavLink to={`/movie/${id}/cast`}>
                        <p>Смотреть <br/> ещё</p>
                        <Arrow width={20}/>
                    </NavLink>
                </div>
            </div>
        </>

    );
};

export default ActorsBar;