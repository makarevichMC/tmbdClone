import React, {FC} from 'react';
import './App.css';
import {BrowserRouter, Route} from 'react-router-dom';
import Profile from './Components/Profile/Profile';
import HeaderContainer from './Components/Header/HeaderContainer';
import LoginFormContainer from './Components/Login/LoginFormContainer';
import MainPageContainer from './Components/MainPage/MainPageContainer';
import MovieDetailsContainer from './Components/MovieDetails/MovieDetailsContainer';
import PersonPageContainer from './Components/PersonPage/PersonPageContainer';
import SortedMoviesPageContainer from './SortedMoviesPage/SortedMoviesPageContainer';
import SearchPageContainer from './Components/SearchPage/SearchPageContainer';

interface appProps {
    setConfig:()=>{}
}

const App:FC<appProps> = ({setConfig}) => {
    setConfig();

    return (
        <BrowserRouter>

                <HeaderContainer/>
                <div className={'app-wrapper'}>
                    <Route  path={'/login'} component={LoginFormContainer}/>
                    <Route exact path={'/u/:userName?'} component={Profile}/>
                    <Route exact path={'/'} component={MainPageContainer}/>
                    <Route exact path={'/person/:id'} component={PersonPageContainer}/>
                    <Route exact path={'/movies'} component={() => <div> movies </div>}/>
                    <Route exact path={'/movies/option/:option'} component={SortedMoviesPageContainer}/>
                    <Route exact path={'/tv/option/:option'} component={SortedMoviesPageContainer}/>
                    <Route exact path={'/tv_details/:mediaType/:id'} component={MovieDetailsContainer}/>
                    <Route exact path={'/movie_details/:mediaType/:id'} component={MovieDetailsContainer}/>
                    <Route exact path={'/search'} component={SearchPageContainer}/>
                </div>
        </BrowserRouter>
    );
}

export default App;
