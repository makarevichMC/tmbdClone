import React, {FC} from 'react';
import DropdownMenu from "../DropdownMenu/DropdownMenu";


const MovieMenu:FC = () => {
    const data = [
        {text: 'Популярные', url: '/movie'},
        {text: 'Смотрят сейчас',url: '/movie/now-playing'},
        {text: 'Ожидаемые', url: '/movie/upcoming'},
        {text: 'Лучшие', url: '/movie/top-rated'}];

    return (
        <DropdownMenu data={data}/>
    );
};

export default MovieMenu;