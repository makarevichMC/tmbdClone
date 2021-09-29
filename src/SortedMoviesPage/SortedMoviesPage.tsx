import React, {FC} from 'react';
import {mediaType, MovieBarData} from '../Types/Types';
import SmallMovieCard from '../Components/MainPage/MoviesSection/MoviesBar/SmallMovieCard/SmallMovieCard';
import styles from './SortedMoviesPage.module.css'
import Button from '../Components/Common/Button/Button';
import {filterType} from '../API/api';
import {initialSorting} from '../redux/reducers/SortedMoviesPageReducer';

type SortedMoviesPageProps = {
    data?: MovieBarData[] | null
    baseUrl: string
    fetchMore: (type: mediaType, dataType?: initialSorting) => any
    sortingType: filterType
    mediaType: mediaType
}

const SortedMoviesPage: FC<SortedMoviesPageProps> = (props) => {



    return (
        <div className={styles.wrapper}>
            <div className={styles.filter_bar}>
            </div>
            <div className={styles.cards}>
                {props.data && props.data?.map(el => {

                    const url = props.baseUrl + el.poster_path
                    return <div className={styles.item} key={el.id}>
                        <SmallMovieCard
                            date={el.release_date || el.first_air_date} id={el.id} title={el.title || el.name}
                            imageUrl={url} rating={el.vote_average * 10}
                        />
                    </div>
                })}
            </div>
            <div className={styles.button}>
                <Button
                    width={'100%'} height={'40px'} text={'Загрузить ещё'}
                    callback={() => {
                        props.fetchMore(props.mediaType)
                    }}
                />
            </div>
        </div>
    );
};

export default SortedMoviesPage;