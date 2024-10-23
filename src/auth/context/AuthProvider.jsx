import React, { useReducer } from 'react'
import { AuthContext } from './AuthContext'
import { authReducer } from './authReducer'

import { types } from '../types/types'

//Al recargar se llama la funcion de init, detecta el user del localStorage y lo carga
const init = () =>{
    const user = JSON.parse(localStorage.getItem('user')); //String a json

    //Debe regresar algo valido como un estado inicial
    return{
        logget: !!user, //Si user existe logget sera true por la doble negación
        user: user,
    }
}

export const AuthProvider = ({ children }) => {

    const [authState, dispatch] = useReducer(authReducer, {}, init);//init inicializacion tambien se puede en el initialState

    const login = (name = ' ') => {

        const userB = {id:'123', name: name}

        const action = {type: types.login, payload: userB}

        localStorage.setItem('user', JSON.stringify(userB)) //En local storage solo se puede grabar string

        dispatch(action)
    }

    const logout = () =>{
        localStorage.removeItem('user')

        const action = {type: types.logout,}

        dispatch(action)
    }

    return (
        <AuthContext.Provider value={{
            ...authState,

            //methods
            login,
            logout,
        }}>
            {children}
        </AuthContext.Provider>
    )
}
