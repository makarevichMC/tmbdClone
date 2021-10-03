import React, {FC} from 'react';
import styles from './MainNav.module.css'
import NavItem from './NavItem/NavItem';
import MovieMenu from "../Common/MenuVariants/MovieMenu";
import TVmenu from "../Common/MenuVariants/TVmenu";
import PeopleMenu from "../Common/MenuVariants/PeopleMenu";
import Moremenu from "../Common/MenuVariants/MoreMenu";



const MainNav:FC = () => {

    return (
        <div className={styles.wrapper}>
            <NavItem text={'Фильмы'} url={'/movies/option/popular'}>
                <MovieMenu/>
            </NavItem>
            <NavItem text={'Сериалы'} url={'/tv/option/popular'}>
                <TVmenu/>
            </NavItem>
            <NavItem text={'Люди'} url={'person'}>
                <PeopleMenu/>
            </NavItem>
            <NavItem text={'Ещё'} url={'#'}>
                <Moremenu/>
            </NavItem>
        </div>
    );
};

export default MainNav;

