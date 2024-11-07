import { screen } from "@testing-library/dom";
import { PrivateRoute } from "../../src/router/PrivateRoute";
import { render } from "@testing-library/react";
import { AuthContext } from "../../src/auth";
import React from "react";
import { MemoryRouter, Route, Routes } from "react-router-dom";


describe('Pruebas en el PrivateRoute', () => {
    test('Debe mostrar el children si esta utenticado', () => {

        //Storage.prototype... con esto llamo el set item y creo una prueba fn (funcion simulada) de el
        //no funciona como en el expect(localStorage.SetItem), se debe sobrescribir la informacion del prototype
        Storage.prototype.setItem = jest.fn();

        const contextValue = {
            logget: true,
            user: {
                name: 'Alejandro',
                id: '123'
            }
        };

        render(
            <AuthContext.Provider value={contextValue}>
                <MemoryRouter initialEntries={['/marvel']}>

                    <Routes>
                        <Route path="/marvel" element={
                            <PrivateRoute>
                                <h1>Esta es ruta privada</h1>
                            </PrivateRoute>
                        } />
                        <Route path="/login" element={<h1>Ruta publica</h1>} />
                    </Routes>



                </MemoryRouter>
            </AuthContext.Provider>
        );
        // esto se muestra si no estoy autenticado, probar con screen.degub
        screen.debug()
        expect(screen.getAllByText('Esta es ruta privada')).toBeTruthy()
        expect(localStorage.setItem).toHaveBeenCalled()

    });

})