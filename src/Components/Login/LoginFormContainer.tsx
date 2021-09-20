import React, {FC} from 'react';
import {connect,ConnectedProps} from "react-redux";
import {RootState} from "../../redux/store";
import {LogInThunk} from "../../redux/reducers/authReducer";
import LoginForm from "./LoginForm";


const LoginFormContainer:FC<ReduxProps> = (props) => {
    return (
      <LoginForm authorized={props.authorized} submitAuthData={props.LogInThunk}/>
    );
};

const mapStateToProps = (state:RootState) => ({
    authorized:state.authorization.Authorized
})

const connector = connect(mapStateToProps,{LogInThunk});
type ReduxProps = ConnectedProps<typeof connector>;

export default  connector(LoginFormContainer);