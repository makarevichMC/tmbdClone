import React, {FC, useState} from 'react';
import {Genre} from "../../../Types/Types";
import styles from './FilterByGenre.module.css'
import Button from "../../../Components/Common/Button/Button";

type FilterByGenreProps = {
    genres: Genre[]
    applyFilters: (genresID:number[]) => any
}
const FilterByGenre: FC<FilterByGenreProps> = ({genres, applyFilters}) => {

    const [activeFilters, setActiveFilters] = useState<number[]>([])

    const filterItems = genres.map(item => {

        return (
            <div
                onClick={(e)=>{
                    const target = e.currentTarget
                    target.classList.toggle(styles.active)
                    const id =  Number(e.currentTarget.dataset.genre_id)
                    if (activeFilters.includes(id)) {
                        setActiveFilters(
                            activeFilters.filter(genreId=>{
                              return genreId!==id
                            })
                        )
                    } else {
                        setActiveFilters([...activeFilters,id])
                    }
                }}
                data-genre_id={item.id}
                className={styles.item}
                key={item.id}
            >
                {item.name}
            </div>)
    })

    return (
        genres.length===0 ?
            <div>LOADING</div>:
        <div className={styles.wrapper}>
            <h6>Жанры</h6>
            {filterItems}
            <Button
                width={'40%'}
                callback={()=>{
                applyFilters(activeFilters)
            }} text={'Поиск'}/>
        </div>
    );
};

export default FilterByGenre;