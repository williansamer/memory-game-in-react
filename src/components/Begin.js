import React from 'react'

export default function Begin(props) {
    return (
        <div> {props.show ?
            <div id="inicio">
                <div className="msg msg-">Ao clicar em "Começar", o cronômetro disparará. Boa Sorte!</div>
                <input type="text" placeholder="Digite seu nome" id="btn-inp" />
                <button className="btn inicio" onClick={props.onHandleBegin}>Começar</button>
            </div>
            : <></>}
        </div>
    )
}
