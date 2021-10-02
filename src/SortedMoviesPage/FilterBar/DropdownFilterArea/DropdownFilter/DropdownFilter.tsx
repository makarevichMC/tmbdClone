import React, {FC, useState} from 'react';
import {sortingType} from '../../../../redux/reducers/SortedMoviesPageReducer';
import DropdownFilterArea from '../DropdownFilterArea';

type DropdownFilterProps = {
    initialFilter:sortingType | null
}

const DropdownFilter:FC<DropdownFilterProps> = ({initialFilter}) => {
    const [currentFilter,setCurrentFilter] = useState(initialFilter);
    return (
        <div>
            {currentFilter && <DropdownFilterArea backgroundColor={'rgb(33, 37, 41)'} label={currentFilter}/>}
        </div>
    );
};

export default DropdownFilter;