import React, {FC} from 'react';
import DropdownMenu from "../DropdownMenu/DropdownMenu";


const TVmenu:FC = () => {
    const data = [
        {text: 'Популярные', url: '/tv/option/popular'},
        {text: 'В эфире сегодня',url: '/tv/option/airing-today'},
        {text: 'По телевидению', url: '/tv/option/on-the-air'},
        {text: 'Лучшие', url: '/tv/option/top-rated'}];

    return (
        <DropdownMenu data={data}/>
    );
};

export default TVmenu;