import React from 'react'
import CardElement from './CardElement'

export default function GameBoard(props) {
    return (
        <div id="gameBoard">
            {props.cards.map((card, index)=>{
                return <CardElement key={index} card={card}></CardElement> //If didn´t have {} there´s no reason to use 'return'
            })}
        </div>
    )
}
