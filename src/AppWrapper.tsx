import React from 'react';
import {RootState} from './redux/store';

import {connect,ConnectedProps} from "react-redux";
import { FC } from 'react';
import App from "./App";
import {SetConfigThunk} from "./redux/reducers/APIconfigReducer";

const AppWrapper:FC<ReduxProps> = (props) => {
    return (
       <App setConfig={props.SetConfigThunk}/>
    );
};

const mapStateToProps = (state:RootState)=>({

})

const connector = connect(mapStateToProps,{SetConfigThunk });
type ReduxProps = ConnectedProps<typeof connector>;

export default connector(AppWrapper);