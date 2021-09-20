import React, {FC} from 'react';
import DropdownMenu from "../DropdownMenu/DropdownMenu";



const ProfileMenu:FC = () => {
    const data = [
        {text: 'Обсуждения', url: '/u'},
        {text: 'Списки',url: '/u'},
        {text: 'Рейтинги', url: '/u'},
        {text: 'Список отслеживания', url: '/u'},
        {text: 'Править профиль', url: '/u'},
        {text: 'Параметры', url: '/u'},
        {text: 'Выход', url: '/u'}];

    return (
        <DropdownMenu data={data}/>
    );
};

export default ProfileMenu;