import React from 'react'

export default function CardElement(props) {
    return (
        <div id={props.card.id} className="card">
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
