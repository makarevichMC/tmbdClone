import React, {FC} from 'react';
import styles from './FilterBar.module.css';
import DropdownFilterArea from "./DropdownFilterArea/DropdownFilterArea";
import DropdownFilter from './DropdownFilterArea/DropdownFilter/DropdownFilter';
import {sortingType} from '../../redux/reducers/SortedMoviesPageReducer';

type FilterBarProps = {
    initialFilter:sortingType | null
}

const FilterBar:FC<FilterBarProps> = ({initialFilter}) => {
    return (
        //@ts-ignore
        <div className={styles.filter_bar}>
            <DropdownFilterArea childrenLabel={'Сортировать результаты по'} label={'Сортировать'}>
                <DropdownFilter initialFilter={initialFilter}/>
            </DropdownFilterArea>
        </div>
    );
};

export default FilterBar;