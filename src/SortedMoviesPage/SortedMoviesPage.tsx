import React, {FC} from 'react';
import {Genre, mediaType, MovieBarData} from '../Types/Types';
import styles from './SortedMoviesPage.module.css'
import Button from '../Components/Common/Button/Button';
import {filterType} from '../API/api';
import {initialSorting, sortingType} from '../redux/reducers/SortedMoviesPageReducer';
import Cards from './Cards/Cards';
import FilterBar from './FilterBar/FilterBar';

type SortedMoviesPageProps = {
    data?: MovieBarData[] | null
    baseUrl: string
    fetchMore: (type: mediaType, dataType?: initialSorting) => any
    sortingType: filterType
    mediaType: mediaType
    additionalSorting: sortingType | null
    setAdditionalSorting: (sorting: sortingType) => any
    setPage: () => any
    tvGenres: Genre[]
    movieGenres: Genre[]
    applyFilters: (genresID: number[]) => any
}

const SortedMoviesPage: FC<SortedMoviesPageProps> = (props) => {

    return (
        <div className={styles.wrapper}>
            <FilterBar setAdditionalSorting={props.setAdditionalSorting} mediaType={props.mediaType}
                       initialFilter={props.additionalSorting} setPage={props.setPage}
                       applyFilters={props.applyFilters} tvGenres={props.tvGenres}
                       movieGenres={props.movieGenres}
            />
            <Cards {...props}/>
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

export default React.memo(SortedMoviesPage);