import React, { useMemo } from 'react';
import { getHeroesByPublisher } from '../../selectors/getHeroesByPublisher';
import { HeroCard } from './HeroCard';

export const HeroList = ({ publisher }) => {

    //usamos useMemo, para que me cree una variable memorizada, heroes, se debe volver a memorizar cuando cambia el publisher. Esta es una iptimizacion para que no se vuelva a generar la información a cada rato
    const heroes = useMemo(() => getHeroesByPublisher( publisher ), [ publisher ] ); // en caso cambie el publisher, vuelvo a jalar data. 

    return (
        <div className="card-columns animate__animated animate__fadeIn">
           {
               heroes.map( hero => (
                   <HeroCard 
                        key={ hero.id }
                        { ...hero }
                    />
                   
               ))
           } 
        </div>
    )
}