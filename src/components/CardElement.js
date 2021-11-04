import React from 'react'

export default function CardElement(props) {
    return (
        <div onClick={()=>{props.handleFlip(props.card)}} id={props.card.id} className={props.card.flipped ? "card flip" : "card"}>
            <div className="card-front">
                <img className="icon" 
                src={`./assets/${props.card.icon}.png`} 
                alt={props.card.icon} />
            </div>
            <div className="card-back">
                {"</>"}
            </div>
        </div>
    )
}
