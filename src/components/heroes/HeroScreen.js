import React, { useMemo } from 'react';
import { useParams, Redirect } from 'react-router-dom';
// import { heroImages } from '../../helpers/heroImages';
import { getHeroById } from '../../selectors/getHeroById';

// import batman from '../../assets/heroes/dc-batman.jpg'; //estatico


export const HeroScreen = ({ history }) => { //hostory

    const { heroeId } = useParams(); //useParams: hook para extraer los params que vengan en el url

    const hero = useMemo(() => getHeroById( heroeId ), [ heroeId ]); //aqui hacemos lo mismo. Para que no se vuelva a realizar en caso las dependencias se mantengan iguales. 

    if ( !hero ) { //si el heroe no existe... retorna undefined
        return <Redirect to="/" />; //entonces nos vamos a esta ruta
    }

    const handleReturn = () => {

        if( history.length <=2 ) { //consultamos la cantidad de registros de historia. Si cumple, es porque entró directamente aqui, entonces lo queremos mandar a la pagina de marvel ("/")
            history.push('/');
        } else {
            history.goBack();  //para regresar a la pagina anterior
        }

    }

    const {
        superhero,
        publisher,
        alter_ego,
        first_appearance,
        characters,
    } = hero;
    
    return (
        <div className="row mt-5">
            <div className="col-4">
                <img 
                    src={ `../assets/heroes/${ heroeId }.jpg` }
                    // src={batman}
                    // src={heroImages(`./${heroeId}.jpg`).default /**https://stackoverflow.com/questions/65289372/image-not-showing-up-in-react-js-using-require-context */}
                    alt={ superhero }
                    className="img-thumbnail animate__animated animate__fadeInLeft"
                />
            </div>

            <div className="col-8 animate__animated animate__fadeIn">
                <h3> { superhero } </h3>
                <ul className="list-group list-group-flush">
                    <li className="list-group-item"> <b> Alter ego: </b> { alter_ego } </li>
                    <li className="list-group-item"> <b> Publisher: </b> { publisher } </li>
                    <li className="list-group-item"> <b> First appearance: </b> { first_appearance } </li>
                </ul>

                <h5> Characters </h5>
                <p> { characters } </p>

                <button 
                    className="btn btn-outline-info"
                    onClick={ handleReturn }
                >
                    Return
                </button>

            </div>

        </div>
    )
}