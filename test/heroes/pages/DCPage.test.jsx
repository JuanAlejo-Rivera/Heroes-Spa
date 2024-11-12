import { render, screen } from "@testing-library/react";
import { DCPage } from "../../../src/heroes/pages/DCPage";
import React from "react";
import { MemoryRouter } from "react-router-dom";


describe('Pruebas en DCPage', () => { 
    test('Debe mostrar el renderizado de la pagina', () => { 
        
        render(
            <MemoryRouter>
                <DCPage/>
            </MemoryRouter>
        )
        // screen.debug()
        expect(screen.getAllByText(/DC Comics/i)).toBeTruthy()


     });
 });