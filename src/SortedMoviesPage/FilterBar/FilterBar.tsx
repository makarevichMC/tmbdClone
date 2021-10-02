import React, {FC, useEffect} from 'react';
import styles from './FilterBar.module.css';
import DropdownFilterArea from "./DropdownFilterArea/DropdownFilterArea";
import DropdownFilter from './DropdownFilterArea/DropdownFilter/DropdownFilter';
import {sortingType} from '../../redux/reducers/SortedMoviesPageReducer';
import {mediaType} from "../../Types/Types";

type FilterBarProps = {
    initialFilter: sortingType | null
    mediaType: mediaType
    setAdditionalSorting: (sorting: sortingType) => any
    setPage: () => any
}

const FilterBar: FC<FilterBarProps> =
    ({
         initialFilter, mediaType,
         setAdditionalSorting, setPage
     }) => {

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
            </div>
        );
    };

export default React.memo(FilterBar);