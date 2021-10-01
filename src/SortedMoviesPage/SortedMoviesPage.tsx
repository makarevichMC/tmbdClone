import React, {FC} from 'react';
import {mediaType, MovieBarData} from '../Types/Types';
import styles from './SortedMoviesPage.module.css'
import Button from '../Components/Common/Button/Button';
import {filterType} from '../API/api';
import {initialSorting} from '../redux/reducers/SortedMoviesPageReducer';
import Cards from "./Cards/Cards";
import FilterBar from "./FilterBar/FilterBar";

type SortedMoviesPageProps = {
    data?: MovieBarData[] | null
    baseUrl: string
    fetchMore: (type: mediaType, dataType?: initialSorting) => any
    sortingType: filterType
    mediaType: mediaType
    test: string
}

const SortedMoviesPage: FC<SortedMoviesPageProps> = (props) => {
    return (
        <div className={styles.wrapper}>
            <FilterBar/>
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

export default SortedMoviesPage;