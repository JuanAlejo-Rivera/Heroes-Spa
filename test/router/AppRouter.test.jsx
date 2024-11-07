import { getAllByAltText, render, screen } from "@testing-library/react"
import { AuthContext } from "../../src/auth"
import { MemoryRouter } from "react-router-dom"
import React from "react"
import { AppRouter } from "../../src/router/AppRouter"


describe('Pruebas AppRouter', () => { 
    test('Debe mostrar el login si no esta autenticado', () => { 

        const contextValue = {
            logget: false,
        }

        render(
            <AuthContext.Provider value={contextValue}>
                <MemoryRouter initialEntries={['/marvel']}>
                    <AppRouter/>
                </MemoryRouter>
            </AuthContext.Provider>
        )

        // screen.debug()
        expect(screen.getAllByText(/Login/i)).toBeTruthy();
    })

    test('Debe de mostrar que el componente de marvel este autenticado', () => { 
        const contextValue = {
            logget: true,
            user:{
                name:'alejandro',
                id: '123'
            }
        }

        render(
            <AuthContext.Provider value={contextValue}>
                <MemoryRouter initialEntries={['/login']}>
                    <AppRouter/>
                </MemoryRouter>
            </AuthContext.Provider>
        )

        // screen.debug()
        expect(screen.getAllByText(/Marvel/i)).toBeTruthy()
        expect(screen.getAllByText('Marvel').length).toBeGreaterThanOrEqual(1)
     })
 })