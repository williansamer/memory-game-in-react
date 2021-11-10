import React, {useState, createContext, useEffect} from 'react'
import game from '../game/game';

export const ContextAPI = createContext();

export function ContextProvider(props) {

    const [gameOver, setGameOver] = useState(false);
    const [cards, setCards] = useState([]);

    useEffect(()=>{
        setCards(game.createCardFromLogos());
    }, []);

/*     function handleCards(cards){
        setCards(cards);
    } */
    
    return (
        <ContextAPI.Provider value={{gameOver, setGameOver, cards, setCards}}>
            {props.children}
        </ContextAPI.Provider>
    )
}
