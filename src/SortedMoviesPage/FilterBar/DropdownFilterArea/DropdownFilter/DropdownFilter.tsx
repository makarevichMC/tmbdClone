import React, {FC, useEffect, useState} from 'react';
import {sortingType} from '../../../../redux/reducers/SortedMoviesPageReducer';
import DropdownFilterArea from '../DropdownFilterArea';
import {filterToLabel} from "../../../../Utils/Utils";
import {mediaType} from "../../../../Types/Types";
import AdditionalFilters from "../AdditionalFilters/AdditionalFilters";


type DropdownFilterProps = {
    initialFilter: sortingType | null
    mediaType:mediaType
    setAdditionalSorting:(sorting:sortingType)=>any
    setPage: () => any
}

const DropdownFilter: FC<DropdownFilterProps> =
    ({initialFilter,mediaType,
         setAdditionalSorting, setPage}) => {
    const [currentFilter, setCurrentFilter] = useState(initialFilter);
    useEffect(()=>{
        setCurrentFilter(initialFilter)
    },[initialFilter])

    return (
        <div>
            {currentFilter && <DropdownFilterArea
                additionalStyles={{
                    backgroundColor: '#E4E7EB',
                    borderRadius: '8px',
                    fontSize: '14px',
                    padding: '10px',
                }}
                borderStyles={{
                    boxShadow:'none'
                }}
                childrenStyles={{
                    border:'none'
                }}
                label={filterToLabel(currentFilter)}>
                    <AdditionalFilters setPage={setPage} activeFilter={currentFilter} mediaType={mediaType} setAdditionalSorting={setAdditionalSorting}/>
            </DropdownFilterArea>}
        </div>
    );
};

export default DropdownFilter;
