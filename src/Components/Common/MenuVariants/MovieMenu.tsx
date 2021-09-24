import React, {FC} from 'react';
import DropdownMenu from "../DropdownMenu/DropdownMenu";


const MovieMenu:FC = () => {
    const data = [
        {text: 'Популярные', url: '/movies'},
        {text: 'Смотрят сейчас',url: '/movies/now-playing'},
        {text: 'Ожидаемые', url: '/movies/upcoming'},
        {text: 'Лучшие', url: '/movies/top-rated'}];

    return (
        <DropdownMenu data={data}/>
    );
};

export default MovieMenu;