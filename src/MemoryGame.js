import React, {useEffect, useState} from 'react'
/* import Begin from './components/Begin'; */
import GameOver from './components/GameOver';
import GameBoard from './components/GameBoard';
import game from './game/game';

export default function MemoryGame() {

    const [begin, setBegin] = useState(true);
    const [cards, setCards] = useState([]);
    const [gameOver, setGameOver] = useState(false);

    function handleBegin(){
        setBegin(false);
    }

    useEffect(()=>{
        setCards(game.createCardFromLogos());
    }, []);

    function handleGameOver(){
        setGameOver(false);
    }

    return (
        <div>
            {/* <Begin onHandleBegin={handleBegin} show={begin}></Begin> */}
            <GameBoard cards={cards}></GameBoard>
            <GameOver onHandleGameOver={handleGameOver} show={gameOver}></GameOver>
        </div>
    )
}
