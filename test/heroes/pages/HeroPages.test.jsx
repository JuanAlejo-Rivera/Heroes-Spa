

import { fireEvent, render, screen } from "@testing-library/react";
import React from "react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { HeroPages } from "../../../src/heroes/pages/HeroPages";
import { getHeroByid } from "../../../src/heroes/helpers";

// Mock de la función useNavigate
const mockedUseNavigate = jest.fn();

// Simula las funciones del router
jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockedUseNavigate
}));

// Simula la función getHeroByid
jest.mock('../../../src/heroes/helpers', () => ({
    getHeroByid: jest.fn(),
}));

describe('Pruebas en el HeroPages', () => {

    /*
Nota: si no simulamos el componente trae los datos ReadableStream
pero eso seria depender de componentes externos como API's, datos importados o de otros archivos
es mejor realizar la simunalcion de la respuesta de datos como acontinuacion
*/

    // Limpia los mocks antes de cada prueba y simula los datos de getHeroByid
    beforeEach(() => {
        jest.clearAllMocks();
        getHeroByid.mockReturnValue({
            'superhero': 'Spider Man-prueba',
            'publisher': 'Marvel Comics-prueba',
            'alter_ego': 'Peter Parker-prueba',
            'first_appearance': 'Amazing Fantasy #15-prueba',
            'characters': 'Peter Parker-prueba'
        });
    });

    test('Se debe comprobar el boton de back', () => {
        // Renderiza el componente con la URL inicial y las rutas necesarias
        const {container} = render(
            <MemoryRouter initialEntries={['/hero/marvel-spider']}>
                <Routes>
                    <Route path="/hero/:id" element={<HeroPages />} />
                    <Route path="/marvel" element={'Estoy en marvel'} />
                </Routes>
            </MemoryRouter>
        );
        expect(container).toMatchSnapshot();
        // screen.debug();
        // Encuentra el botón y simula un clic
        const button = screen.getByRole('button');
        fireEvent.click(button);

        // Pruebas
        expect(mockedUseNavigate).toHaveBeenCalledWith(-1);
        expect(screen.getAllByText(/Peter Parker-prueba/i)).toBeTruthy()
        expect(screen.getAllByText(/Peter Parker-prueba/i)).toHaveLength(2);

    });


    test('Si no se retorna un heroe valido debe retornar a marvel', () => { 
        
        render(
            <MemoryRouter initialEntries={['/marvel']}>
                <Routes>
                    <Route path="/hero/:id" element={<HeroPages />} />
                    <Route path="/marvel" element={'Estoy en marvel'} />
                </Routes>
            </MemoryRouter>
        );
        screen.debug()
        // expect(screen.getAllByText(/Estoy en marvel/i)).toBeTruthy()
     });
});
