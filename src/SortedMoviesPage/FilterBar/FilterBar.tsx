import React, {FC} from 'react';
import styles from './FilterBar.module.css';
import DropdownFilterArea from './DropdownFilterArea/DropdownFilterArea';
import DropdownFilter from './DropdownFilterArea/DropdownFilter/DropdownFilter';
import {sortingType} from '../../redux/reducers/SortedMoviesPageReducer';
import {Genre, mediaType} from '../../Types/Types';
import FilterByGenre from './FilterByGenre/FilterByGenre';

type FilterBarProps = {
    initialFilter: sortingType | null
    mediaType: mediaType
    setAdditionalSorting: (sorting: sortingType) => any
    setPage: () => any
    tvGenres: Genre[]
    movieGenres: Genre[]
    applyFilters: (genresID: number[]) => any
}

const FilterBar: FC<FilterBarProps> =
    ({
         movieGenres, tvGenres, applyFilters,
         initialFilter, mediaType,
         setAdditionalSorting, setPage
     }) => {

        let genres
        if (mediaType === 'TV') {
            genres = tvGenres
        } else {
            genres = movieGenres
        }

        return (
            //@ts-ignore
            <div className={styles.filter_bar}>

                <DropdownFilterArea
                    childrenLabel={'Сортировать результаты по'} label={'Сортировать'}
                    borderStyles={{
                        boxShadow: 'none'
                    }}
                >
                    <DropdownFilter setPage={setPage} setAdditionalSorting={setAdditionalSorting}
                                    mediaType={mediaType} initialFilter={initialFilter}/>
                </DropdownFilterArea>

                <FilterByGenre genres={genres} applyFilters={applyFilters}/>
            </div>
        );
    };

export default React.memo(FilterBar);