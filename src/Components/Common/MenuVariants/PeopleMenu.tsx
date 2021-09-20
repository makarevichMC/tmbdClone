import React, {FC} from 'react';
import DropdownMenu from "../DropdownMenu/DropdownMenu";


const PeopleMenu:FC = () => {
    const data = [{text: 'Популярные люди', url: '/person'}];

    return (
        <DropdownMenu data={data}/>
    );
};

export default PeopleMenu;