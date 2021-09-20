import {Action, personCredits, personDetails} from '../../Types/Types';
import {deepEqual} from '../../Utils/Utils';
import {Dispatch} from 'redux';
import {personPageAPI} from "../../API/api";

export interface personPageState {
    personDetails:personDetails|null
    personCredits:personCredits|null
}

const initialState: personPageState = {
    personDetails:null,
    personCredits:null
}

export enum personPageActions {
    SET_PERSON_DETAILS = 'SET_PERSON_DETAILS',
    SET_PERSON_CREDITS = 'SET_PERSON_CREDITS',
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

type personPageAction = setPersonDetailsAction | setPersonCreditsAction

export const personPageReducer = (state=initialState,action:personPageAction) => {
    switch (action.type) {
        case personPageActions.SET_PERSON_DETAILS:
            if (deepEqual(state.personDetails,action.payload.details)) return
            return {...state,personDetails:action.payload.details}
        case personPageActions.SET_PERSON_CREDITS:
            if (deepEqual(state.personDetails,action.payload.credits)) return
            return {...state,personCredits:action.payload.credits}
    }
    return state
}

export const setPersonPageThunk = (id:string) => async (dispatch:Dispatch<Action>)=>{

    const innerId = Number(id);

    const details =  await personPageAPI.getPersonInfo(innerId);
    const credits = await personPageAPI.getPersonCredits(innerId);

    dispatch(setPersonDetailsAC(details));
    dispatch(setPersonCreditsAC(credits));

}