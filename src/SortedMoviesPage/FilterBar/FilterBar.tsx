import React, {FC} from 'react';
import styles from './FilterBar.module.css';
import DropdownFilterArea from "./DropdownFilterArea/DropdownFilterArea";

const FilterBar:FC = () => {
    return (
        //@ts-ignore
        <div className={styles.filter_bar}>
            <DropdownFilterArea label={'Сортировать'}>
                <div>GAYBAR</div>
            </DropdownFilterArea>
        </div>
    );
};

export default FilterBar;