import {
    Action,
    AuthLogoutAction,
    AuthReducerActions, AuthSetSessionIdAction,
    AuthSetUserAction,
    AuthStateInterface,
    AuthToggleAction,
    IUserInfo,
    LoginData
} from "../../Types/Types";
import {Dispatch} from "redux";
import {AuthorizationAPI, UserAPI} from "../../API/api";


const initialState:AuthStateInterface = {
    Authorized:false,
    userInfo:null,
    session_id:'',
};


 export const authReducer = (state = initialState,action:Action ):AuthStateInterface =>{

    switch (action.type) {
        case AuthReducerActions.AUTH_TOGGLE:
            return {...state,Authorized:!state.Authorized}
        case AuthReducerActions.SET_USERS_INFO:
            return {...state,userInfo:action.payload}
        case AuthReducerActions.LOGOUT:
            return {...state,userInfo:null,session_id:''}
        case AuthReducerActions.SET_SESSION_ID:
            return {...state,session_id:action.payload.session_id}
    }
    return state
}

 const AuthToggleAC = ():AuthToggleAction=>({type:AuthReducerActions.AUTH_TOGGLE});

 const SetUserInfoAC = (user:IUserInfo):AuthSetUserAction=>({type:AuthReducerActions.SET_USERS_INFO,payload:user});

 const LogoutAC = ():AuthLogoutAction=>({type:AuthReducerActions.LOGOUT});

 const setSessionIdAC = (session_id:string):AuthSetSessionIdAction=>({type:AuthReducerActions.SET_SESSION_ID,payload:{session_id}});

export const LogInThunk = (data:LoginData) => async (dispatch:Dispatch<Action>):Promise<string|undefined>=>{
     const tokenData =  await AuthorizationAPI.getToken();
     if (!tokenData.success){
         console.log(tokenData.status_message)
         return (tokenData.status_message)
     }
    const loginResponse = await AuthorizationAPI.CreateLoginSession(
        data.username,
        data.password,
        tokenData.request_token
    )
    if (!loginResponse.success){
        console.log(loginResponse.status_message)
        return loginResponse.status_message
    }
    const sessionIdResponse = await AuthorizationAPI.CreateNewSession(loginResponse.request_token);
    if(!sessionIdResponse.success){
        console.log(loginResponse.status_message)
        return loginResponse.status_message
    }
    dispatch(setSessionIdAC(sessionIdResponse.session_id));
    dispatch(AuthToggleAC());
    console.log('logged in successfully')

    const userInfo = await UserAPI.getUserInfo(sessionIdResponse.session_id);
    console.log(userInfo.username,userInfo.name)
    dispatch(SetUserInfoAC(userInfo));


}

export const LogOutThunk = (session_id:string) => async (dispatch:Dispatch<Action>):Promise<string|undefined>=>{

        const response = await AuthorizationAPI.DeleteSession(session_id);

        if (!response.success) return response.status_message

        if (response.success) {
            dispatch(LogoutAC());
            dispatch(AuthToggleAC());
        }

}

export default authReducer;