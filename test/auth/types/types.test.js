import { render } from "@testing-library/react";
import { types } from "../../../src/auth/types/types";
import { AuthContext } from "../../../src/auth";

describe('Pruebas en "Types"', () => { 
    test('Debe de regresar estos types', () => { 

        expect(types).toEqual({
            login: '[Auth Login]',
            logout: '[Auth Logout]',
        })
        
     });
 });