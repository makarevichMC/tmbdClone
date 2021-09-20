import React, {FC} from 'react';
import './App.css';
import {BrowserRouter, Route} from 'react-router-dom';
import Profile from './Components/Profile/Profile';
import HeaderContainer from './Components/Header/HeaderContainer';
import LoginFormContainer from './Components/Login/LoginFormContainer';
import {query} from "./API/api";
import MainPageContainer from './Components/MainPage/MainPageContainer';
import MovieDetailsContainer from './Components/MovieDetails/MovieDetailsContainer';
import PersonPageContainer from './Components/PersonPage/PersonPageContainer';

interface appProps {
    setConfig:()=>{}
}

const App:FC<appProps> = ({setConfig}) => {
    setConfig();

    // getConfigurationAPI()
    //     .then(res=>console.log(res.images))
    // query().then(res=>console.log(res))
    return (
        <BrowserRouter>
            <HeaderContainer/>
            <div className={'app-wrapper'}>
                <Route exact path={'/login'} component={()=><LoginFormContainer/>}/>
                <Route exact path={'/u/:userName?'} component={()=><Profile/>}/>
                <Route exact path={'/main'} component={()=><MainPageContainer/>}/>
                <Route exact path={'/movies/:id?'} component={()=><MovieDetailsContainer/>}/>
                <Route exact path={'/person/:id?'} component={()=><PersonPageContainer/>}/>
                <Route/>
            </div>
        </BrowserRouter>
    );
}

export default App;
