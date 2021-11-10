import React, {useContext} from 'react'
import game from '../game/game';
import { ContextAPI } from './ContextAPI';

export default function GameOver(props) {

    const {setCards, gameOver, setGameOver} = useContext(ContextAPI);

    async function handleGameOver(){
        //game.restartCron();
        await window.location.reload();
        setGameOver(false);
        setCards(game.createCardFromLogos());
    }

    return (
    <div>{gameOver ?
        <div id="gameOver">
            <div className="msg">Jogo finalizado. Parabéns!</div>
            <br />
            <div className="your-score"></div>
            <br />
            <button className="btn reinicio" onClick={handleGameOver}>Jogar Novamente</button>
        </div>
        : <></>}
    </div>
    )
}



//_________________________Increment later____________________________

/*             <div className="ranking">
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
            </div> */