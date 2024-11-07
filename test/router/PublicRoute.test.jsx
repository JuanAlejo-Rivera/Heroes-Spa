import { render, screen } from "@testing-library/react";
import { AuthContext } from "../../src/auth";
import { PublicRoute } from "../../src/router/PublicRoute";
import React from "react";
import { MemoryRouter, Route, Routes } from "react-router-dom";


describe('Pruebas en PublicRoute', () => {
    test('Si no está autenticado, debe de mostrar el children', () => {

        const contextValue = {
            logget: false
        };

        render(
            <AuthContext.Provider value={contextValue}>
                <PublicRoute>
                    <h1>Esta es ruta publica</h1>
                </PublicRoute>
            </AuthContext.Provider>
        );
        // esto se muestra si no estoy autenticado, probar con screen.degub
        expect(screen.getAllByText('Esta es ruta publica')).toBeTruthy()

    });

    test('Debe de navegar si esta autenticado', () => {
        const contextValue = {
            logget: true,
            user: {
                name: 'Alejandro',
                id: '1234'
            }
        };

        // Se deben establecer las rutas en el MemoryRouter para simular la navegación durante las pruebas
        render(
            <AuthContext.Provider value={contextValue}>
                <MemoryRouter initialEntries={['/login']}>
                    <Routes>
                        <Route path="login" element={
                            <PublicRoute>
                                <h1>Esta es ruta publica</h1>
                            </PublicRoute>
                        } />
                        <Route path="marvel" element={
                            <h1>Pagina de marvel</h1>
                        } />
                    </Routes>
                </MemoryRouter>
            </AuthContext.Provider>
        );

        screen.debug()
        expect(screen.getAllByText('Pagina de marvel')).toBeTruthy()

    });
});