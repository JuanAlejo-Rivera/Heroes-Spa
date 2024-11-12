import { fireEvent, render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { SearchPage } from '../../../src/heroes/pages/SearchPage'
import React from 'react'

const mockedUseNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockedUseNavigate
}));


describe('Pruebas en SearchPage', () => {

    beforeEach(() => jest.clearAllMocks());

    test('Debe de mostrarse conrretamente con valores por defecto', () => {
        const { container } = render(
            <MemoryRouter>
                <SearchPage />
            </MemoryRouter>
        );
        // screen.debug()
        expect(container).toMatchSnapshot();
    })

    test('Debe de mostrar a batman y el input con el valor del queryString', () => {
        render(
            <MemoryRouter initialEntries={['/search?q=batman']}>
                <SearchPage />
            </MemoryRouter>
        );

        const input = screen.getByRole('textbox')
        expect(input.value).toBe('batman')

        const img = screen.getByRole('img')
        expect(img.src).toContain('/heroes/dc-batman.jpg')

        const ariaNoHero = screen.getByLabelText('Nohero')
        expect(ariaNoHero.style.display).toBe('none')
        // console.log(ariaNoHero)//trae diferentes paramentros para poder evaluar
        // screen.debug()

    });

    test('Debe de mostrar un error si no se encuentra el hero (batman123)', () => {
        render(
            <MemoryRouter initialEntries={['/search?q=batman123']}>
                <SearchPage />
            </MemoryRouter>
        );

        const ariaNoHero = screen.getByLabelText('Nohero')
        expect(ariaNoHero.style.display).toBe('')
        // console.log(ariaNoHero.style) 

    })

    test('Debe de llamar el navigate a la pantalla nueva, simulando una nueva busqueda', () => {
 
        render(
            <MemoryRouter initialEntries={['/search']}>
                <SearchPage />
            </MemoryRouter>
        );

        const input = screen.getByRole('textbox')
        fireEvent.change(input, {target:{name:'SearchText', value:'batman'}})

        const form = screen.getByRole('form')
        fireEvent.submit(form)

        expect(mockedUseNavigate).toHaveBeenCalledWith('?q=batman')

    });

});