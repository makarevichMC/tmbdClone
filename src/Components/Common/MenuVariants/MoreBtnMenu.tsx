import React, {FC} from 'react';
import DropdownMenu from "../DropdownMenu/DropdownMenu";


const MoreBtnMenu:FC = () => {
    const data = [
        {text: 'Добавить в список', url: '/leaderboard'},
        {text: 'Избранное', url: '/leaderboard'},
        {text: 'Список отслеживания', url: '/leaderboard'},
        {text: 'Ваш рейтинг', url: '/leaderboard'}];

    return (
        <DropdownMenu data={data}/>
    );
};

export default MoreBtnMenu;