import React, {FC} from 'react';
import DropdownMenu from "../DropdownMenu/DropdownMenu";


const TVmenu:FC = () => {
    const data = [
        {text: 'Популярные', url: '/tv'},
        {text: 'В эфире сегодня',url: '/tv/airing-today'},
        {text: 'По телевидению', url: '/tv/on-the-air'},
        {text: 'Лучшие', url: '/tv/top-rated'}];

    return (
        <DropdownMenu data={data}/>
    );
};

export default TVmenu;