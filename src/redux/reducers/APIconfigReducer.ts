import {Action, APIConfig, setConfigAction} from '../../Types/Types';
import {Dispatch} from 'redux';
import {getConfigurationAPI} from '../../API/api';



const initialState: APIConfig = {
    images: {
        base_url: '',
        secure_base_url: '',
        backdrop_sizes: [],
        still_sizes: [],
        logo_sizes: [],
        profile_sizes: [],
        poster_sizes: []
    },
    change_keys: []
}

const setConfigAC = (config: APIConfig): setConfigAction => ({type: 'SET_CONFIG', payload: config});

export const APIconfigReducer = (state = initialState, action: Action): APIConfig => {
    switch (action.type) {
        case 'SET_CONFIG':
            return {...action.payload}
    }
    return state
}

export const SetConfigThunk = () => async (dispatch: Dispatch<Action>) => {

    const response = await getConfigurationAPI();

    dispatch(setConfigAC(response));

}