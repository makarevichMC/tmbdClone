import React, {FC} from 'react';
import {connect,ConnectedProps} from 'react-redux';
import {RootState} from '../../redux/store';
import Header from './Header';
import {LogOutThunk} from '../../redux/reducers/authReducer';




const HeaderContainer:FC<ReduxProps> = (props) => {
    return (
        <Header session_id={props.session_id} logout={props.LogOutThunk} authorized={props.authorized} username={props.username}/>
    );
};




const mapStateToProps = (state:RootState)=>({
    authorized:state.authorization.Authorized,
    username:state.authorization.userInfo?.username,
    session_id:state.authorization.session_id,
})

const connector = connect(mapStateToProps,{LogOutThunk});
type ReduxProps = ConnectedProps<typeof connector>;

export default connector(HeaderContainer);