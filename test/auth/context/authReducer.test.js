import { authReducer } from "../../../src/auth/context/authReducer";
import { types } from "../../../src/auth/types/types";

describe('Pruebas en el autReducer', () => {
    test('Debe retornar el estado por defecto', () => {

        const state = authReducer({ logget: false }, {})
        expect(state).toEqual({ logget: false })

    });

    test('Debe de (login) llamar el login autenticar y establecer el user', () => {

        
        const action = {
            type: types.login,
            payload: {
                id: '123',
                name: 'Alejandro'
            }
    
        }

        const state = authReducer({ logget: false }, action)
        expect(state).toEqual({
            logget: true,
            user: {
                id: '123', name: 'Alejandro'
            }
        })

    });

    test('Debe de (logout) borrar el name del usuario y logget en false', () => {

        const action ={
            type: types.logout
        }

        const state = {
            logget: true,
            user:{
                id:'123',
                name:'Alejandro'
            }
        }


        const newState = authReducer(state, action)
        // console.log(newState)
        expect(newState).toEqual({ logget: false })

    });



});