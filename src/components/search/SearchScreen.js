import React, { useMemo } from 'react';
import queryString from 'query-string';
import { HeroCard } from '../heroes/HeroCard';
import { useForm } from '../../hooks/useForm';
import { useLocation } from 'react-router-dom';
import { getHeroesByName } from '../../selectors/getHeroesByName.js';

export const SearchScreen = ({ history }) => {

    const location = useLocation(); //con esto puedo saber toda la location, incluyendo la propiedad search. 
    const { q = '' } = queryString.parse( location.search ); // https://www.npmjs.com/package/query-string. En 'q' se guarda el query. Si es undefined le voy a poner que es igual a un string vacío para que no me de ningun error. 

    const [ formValues, handleInputChange ] = useForm({
        searchText: q
    });
    const { searchText } = formValues;
    
    const heroesFiltered = useMemo(() => getHeroesByName( q ), [q]); //optimizamos recursos. Solamente rememorizamos cuando cambie el query (q).
    // cada vez que cambio el state, searchText, vuelve a ejecutar todo. Usamos usememo para que solamente se vuelva a consultar cuando cambie el q. 

    const handleSearch = (e) => {
        e.preventDefault(); //para que no se autorefresque al presionar enter. 
        history.push(`?q=${ searchText }`); //para que agregue al history la ruta actual con el query
    }

    return (
        <div>
            <h1>Search Screen</h1>
            <hr />
            
            <div className="row">
                
                <div className="col-5">
                    <h4> Search Form </h4>
                    <hr />

                    <form onSubmit={ handleSearch }>
                        <input 
                            type="text"
                            placeholder="Find your hero"
                            className="form-control"
                            name="searchText"
                            autoComplete="off"
                            value={ searchText }
                            onChange={ handleInputChange }
                        />

                        <button
                            type="submit"
                            className="btn m-1 btn-block btn-outline-primary"
                        >
                            Search...
                        </button>
                    </form>


                </div>


                <div className="col-7">

                    <h4> Results </h4>
                    <hr />

                    { 
                        (q ==='') 
                            && 
                            <div className="alert alert-info">
                                Search a hero
                            </div>
                    }

                    { 
                        (q !=='' && heroesFiltered.length === 0 ) 
                            && 
                            <div className="alert alert-danger">
                                There is no a hero with { q }
                            </div>
                    }

                    {
                        heroesFiltered.map( hero => (
                            <HeroCard 
                                key={ hero.id }
                                { ...hero }
                            />
                        ))
                    }

                </div>

            </div>


        </div>
    )
}