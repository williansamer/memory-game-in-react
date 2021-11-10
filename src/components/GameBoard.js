import React, {useContext} from 'react'
import CardElement from './CardElement'
import game from '../game/game';
import { ContextAPI } from './ContextAPI';

export default function GameBoard(props) {

    const {cards, setCards, setGameOver} = useContext(ContextAPI);

    function handleFlip(card){
        game.flipCard(card.id, ()=>{setGameOver(true)}, ()=>{setCards([...game.cards])});
        setCards([...game.cards]);
    }

    return (
        <div id="gameBoard">
            {cards.map((card, index)=>{
                return <CardElement handleFlip={handleFlip} key={index} card={card}></CardElement> //If didn´t have {} there´s no reason to use 'return'
            })}
        </div>
    )
}
