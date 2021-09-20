import React, {FC} from 'react';
import styles from './Header.module.css';
import logo from '../../images/moviedb-main-logo.svg';
import MainNav from '../MainNav/MainNav';
import NavItem from '../MainNav/NavItem/NavItem';
import ProfileMenu from '../Common/MenuVariants/ProfileMenu';
import {NavLink} from 'react-router-dom';


interface HeaderProps {
    authorized: boolean
    username: string | undefined
    logout: (session_id: string) => Promise<string | undefined>
    session_id: string
}


const Header: FC<HeaderProps> = ({authorized, username, logout, session_id}) => {

    return (
        <header>
            <div className={styles.content}>
                <div className={styles.logo}>
                    <NavLink to={'/main'}>
                        <img src={logo} alt="not found"/>
                    </NavLink>
                </div>
                <MainNav/>
                {
                    username
                    ?
                    <NavItem text={username} url={'/u'} addStyle={styles.login}>
                        <ProfileMenu/>
                    </NavItem>
                    :
                    <NavItem text={'Войти'} url={'/login'} addStyle={styles.login}/>
                }
            </div>
        </header>
    );
};

export default Header;
//onCLick={() => logout(session_id)}