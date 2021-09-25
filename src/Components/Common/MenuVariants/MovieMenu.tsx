import React, {FC} from 'react';
import DropdownMenu from "../DropdownMenu/DropdownMenu";


const MovieMenu:FC = () => {
    const data = [
        {text: 'Популярные', url: '/movies/option/popular'},
        {text: 'Смотрят сейчас',url: '/movies/option/now-playing'},
        {text: 'Ожидаемые', url: '/movies/option/upcoming'},
        {text: 'Лучшие', url: '/movies/option/top-rated'}];

    return (
        <DropdownMenu data={data}/>
    );
};

export default MovieMenu;