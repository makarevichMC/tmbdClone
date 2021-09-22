import {Action, personCredits, personDetails} from '../../Types/Types';
import {deepEqual} from '../../Utils/Utils';
import {Dispatch} from 'redux';
import {personPageAPI} from "../../API/api";

export interface personPageState {
    personDetails:personDetails|null
    personCredits:personCredits|null
    isLoading:boolean
}

const initialState: personPageState = {
    personDetails:null,
    personCredits:null,
    isLoading:false
}

export enum personPageActions {
    SET_PERSON_DETAILS = 'SET_PERSON_DETAILS',
    SET_PERSON_CREDITS = 'SET_PERSON_CREDITS',
    TOGGLE_LOADING = 'TOGGLE_LOADING'
}
export type toggleLoadingAction = {
    type:personPageActions.TOGGLE_LOADING
}

export type setPersonDetailsAction = {
    type: personPageActions.SET_PERSON_DETAILS,
    payload: {
        details: personDetails
    }
}

export type setPersonCreditsAction = {
    type:personPageActions.SET_PERSON_CREDITS,
    payload:{
        credits:personCredits
    }
}
const toggleLoadingAC = ():toggleLoadingAction => ({type:personPageActions.TOGGLE_LOADING})

const setPersonDetailsAC = (details:personDetails):setPersonDetailsAction=>({
    type:personPageActions.SET_PERSON_DETAILS,
    payload:{
        details
    }
})

const setPersonCreditsAC = (credits:personCredits):setPersonCreditsAction=>({
    type:personPageActions.SET_PERSON_CREDITS,
    payload:{
        credits
    }
})

type personPageAction = setPersonDetailsAction | setPersonCreditsAction | toggleLoadingAction

export const personPageReducer = (state=initialState,action:personPageAction) => {
    switch (action.type) {
        case personPageActions.SET_PERSON_CREDITS:
            if (!deepEqual(action.payload.credits,state.personCredits)){
                return {...state,personCredits:action.payload.credits}
            }
            return {...state}
        case personPageActions.SET_PERSON_DETAILS:
            if (!deepEqual(state.personDetails,action.payload.details)) {
                return {...state, personDetails: action.payload.details}
            }
            return {...state}
        case personPageActions.TOGGLE_LOADING:
            return {...state,isLoading:!state.isLoading}
    }
    return state
}

export const setPersonPageThunk = (id:string) => async (dispatch:Dispatch<Action>)=>{

    const innerId = Number(id);

    dispatch(toggleLoadingAC());

    const details =  await personPageAPI.getPersonInfo(innerId);
    const credits = await personPageAPI.getPersonCredits(innerId);

    dispatch(setPersonDetailsAC(details));
    dispatch(setPersonCreditsAC(credits));

    dispatch(toggleLoadingAC());
}