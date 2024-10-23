import { types } from '../types/types';

//Lo reducer no deben llamar funcionalidades externar api, recuros etc, solo se deben resolver con ñps state y los action
export const authReducer = (state = {}, action) => {

    switch (action.type) {
        case types.login:
            return {
                ...state,
                logget: true,
                user: action.payload
            };

        case types.logout:
            return {
                logget: false,
            };

        default:
            return state;
    }

}
