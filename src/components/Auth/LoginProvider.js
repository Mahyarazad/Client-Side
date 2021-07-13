import React from 'react';
import loginReducer from '../../Reducer/Reducer';
import {ACTIONS} from '../../Reducer/Actions';

export const LoginContext = React.createContext();

export function Provider({children}){
    const initialState = {
        username : '',
        password : '',
        confirmPassword:'',
        isloading : false,
        error : '',
        isLoggedin : false
    }
    const [state, dispatch] = React.useReducer(loginReducer, initialState);
    const value = {
        ...state, 
        loading: () => {dispatch({type: ACTIONS.LOADING})},
        success: () => {dispatch({type: ACTIONS.SUCCESS})},
        errorM: () => {dispatch({type: ACTIONS.ERROR})},
        errorP: () => {dispatch({type: ACTIONS.PASSCONFIRM})},
        loggedout: () => {dispatch({type: ACTIONS.LOGGEDOUT})},
        field: val => {dispatch({ type:ACTIONS.FIELD, field: val.name, value:val.value})}
    }
    return (
        <LoginContext.Provider value={value}>
            {children}
        </LoginContext.Provider>
    )
}