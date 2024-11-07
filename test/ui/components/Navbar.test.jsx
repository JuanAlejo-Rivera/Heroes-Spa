import { fireEvent, render, screen } from "@testing-library/react"; // Importamos las funciones necesarias de Testing Library
import { Navbar } from "../../../src/ui/components/Navbar"; // Importamos el componente Navbar que vamos a probar
import React from "react"; // Importamos React
import { AuthContext } from "../../../src/auth"; // Importamos el contexto de autenticación para poder usarlo en las pruebas
import { MemoryRouter, useNavigate } from "react-router-dom"; // Importamos MemoryRouter para el enrutamiento en las pruebas y useNavigate para simular la navegación

// Simulamos el hook useNavigate de react-router-dom para controlar su comportamiento en las pruebas
const mockedUseNavigate = jest.fn();

// Usamos jest.mock para sobrescribir el comportamiento del hook useNavigate y que siempre nos devuelva la función simulada
jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'), // Mantenemos el comportamiento real de react-router-dom
    useNavigate: () => mockedUseNavigate // Sobrescribimos solo el hook useNavigate para que devuelva nuestra función simulada
}));

describe('Pruebas en el Navbar', () => {
    // Definimos el valor del contexto que se pasará al componente Navbar
    const contextValue = {
        logget: true, // El usuario está logueado
        user: { // Información del usuario
            name: 'Alejandro',
            id: '1234'
        },
        logout: jest.fn(), // Función simulada para el logout
    }
    
    // Limpiamos todos los mocks antes de cada prueba
    beforeEach(() => jest.clearAllMocks());

    test('Debe de mostrar el nombre del usuario', () => {
        // Renderizamos el componente Navbar envuelto en el AuthContext.Provider para que pueda acceder al contexto
        render(
            <AuthContext.Provider value={contextValue}>
                <MemoryRouter> {/* Usamos MemoryRouter para simular la navegación */}
                    <Navbar />
                </MemoryRouter>
            </AuthContext.Provider>
        );

        // Verificamos que el nombre del usuario (Alejandro) se muestre correctamente en el Navbar
        expect(screen.getByText(contextValue.user.name)).toBeTruthy();
    });

    test('Debe de llamar el logout y navigate cuando se hace click en el boton', () => { 
        // Renderizamos el componente Navbar envuelto en el AuthContext.Provider
        render(
            <AuthContext.Provider value={contextValue}>
                <MemoryRouter>
                    <Navbar />
                </MemoryRouter>
            </AuthContext.Provider>
        );

        // Buscamos el botón con el texto "Logout" usando su rol de 'button' y el nombre accesible
        const logoutBtn = screen.getByRole('button', { name: /Logout/i });

        // Simulamos un clic en el botón de logout
        fireEvent.click(logoutBtn);

        // Verificamos que la función logout haya sido llamada
        expect(contextValue.logout).toHaveBeenCalled();

        // Verificamos que useNavigate haya sido llamado con la ruta "/login" y el parámetro replace: true
        expect(mockedUseNavigate).toHaveBeenCalledWith("/login", { "replace": true });
    });
});
