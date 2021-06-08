import { heroes } from '../data/heroes';

export const getHeroesByPublisher = ( publisher ) => {

    const validPublishers = ['DC Comics', 'Marvel Comics']; //los validos

    if ( !validPublishers.includes( publisher ) ) {  //si no lo encuentra, tira un error. 
        throw new Error(`Publisher "${ publisher }" no es correcto`);
    }

    return heroes.filter( hero => hero.publisher === publisher );//retorno los que cumplan

}