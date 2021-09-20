import React, {FC} from 'react';
import {MovieBarData} from '../../../Types/Types';
import RecomendationCard from './RecomendationCard/RecomendationCard';
import styles from './Recomendations.module.css'

type RecomendationsProps = {
    recomendationsData: MovieBarData[]
    baseUrl?: string | null
}

const Recomendations: FC<RecomendationsProps> = ({recomendationsData, baseUrl}) => {

    const cards = recomendationsData.map(item => {

        const title = item.name ? item.name : item.title
        let date = item.release_date ? item.release_date : item.first_air_date
        const tv = !!item.name;
        const url = baseUrl && item.backdrop_path ? baseUrl + item.backdrop_path : ''

        if (date){
            date = date!.split('-').reverse().join('/');
        }

        return (
            <div key={item.id} className={styles.card_item}>
                <RecomendationCard title={title} rating={item.vote_average * 10}
                                   date={date} imgUrl={url}
                                   id={item.id} tv={tv}/>
            </div>
        )
    })

    return (
        <div className={styles.cards_wrapper}>
            {cards}
        </div>
    );
};

export default Recomendations;