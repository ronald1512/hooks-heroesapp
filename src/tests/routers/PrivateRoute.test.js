import React from 'react';
import { mount } from 'enzyme';
import { PrivateRoute } from '../../routers/PrivateRoute';
import { MemoryRouter } from 'react-router-dom';

describe('Pruebas en <PrivateRoute />', () => {
    
    const props = {
        location: {
            pathname: '/marvel'
        }
    }

    Storage.prototype.setItem = jest.fn(); //mock del localstorage

    test('debe de mostrar el componente si está autenticado y guardar localStorage', () => {
        
        const wrapper = mount(
            <MemoryRouter>{/**Nos permite falsear las rutas para hacer pruebas a un router sin estar en uno. */}
                <PrivateRoute 
                    isAuthenticated={ true }
                    component={ () => <span>Listo!</span> } //un componente es una funcion!! Porque se trata de un functional component.
                    { ...props }
                />
            </MemoryRouter>
        );//debemos usar mount porque shallow no renderiza a fondo

        expect( wrapper.find('span').exists() ).toBe(true);
        expect( localStorage.setItem ).toHaveBeenCalledWith('lastPath', '/marvel');


    });


    test('debe de bloquear el componente si no está autenticado', () => {
        
        const wrapper = mount(
            <MemoryRouter>
                <PrivateRoute 
                    isAuthenticated={ false }
                    component={ () => <span>Listo!</span> }
                    { ...props }
                />
            </MemoryRouter>
        );

        expect( wrapper.find('span').exists() ).toBe(false); //si no está autenticado, no deja ver al componente
        expect( localStorage.setItem ).toHaveBeenCalledWith('lastPath', '/marvel');

    });
    
    

})