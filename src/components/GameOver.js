import React from 'react'

export default function GameOver(props) {



    return (
    <div>{props.show ?
        <div id="gameOver">
            <div className="msg">Jogo finalizado. Parabéns!</div>
            <br />
            <div className="your-score"></div>
            <br />
{/*             <div className="ranking">
            <div className="inner-box mov">
                <div className="minus-more">Menos movimento</div>
                <div className="podium first-position-m">a</div>
                <div className="podium second-position-m">b</div>
                <div className="podium third-position-m">c</div>
            </div>
            <div className="inner-box time">
                <div className="minus-more">Mais rápido</div>
                <div className="podium first-position-t">a</div>
                <div className="podium second-position-t">b</div>
                <div className="podium third-position-t">c</div>
            </div>
            </div> */}
            <button className="btn reinicio" onClick={props.onHandleGameOver}>Jogar Novamente</button>
        </div>
        : <></>}
    </div>
    )
}
