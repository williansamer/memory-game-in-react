import React, {useEffect, useState} from 'react'
import Begin from './components/Begin';
import GameOver from './components/GameOver';
import GameBoard from './components/GameBoard';
import game from './game/game';

export default function MemoryGame() {

    const [begin, setBegin] = useState(true);
    const [gameBoard, setGameBoard] = useState(false);
    const [gameOver, setGameOver] = useState(false);
    const [cards, setCards] = useState([]);

    function handleBegin(){
        setBegin(false);
        setCards(game.createCardFromLogos());
        setGameBoard(true);
    }

    function handleGameOver(){

        game.restartCron();
        window.location.reload();
        setCards(game.createCardFromLogos());
        setGameOver(false);
    }

    function handleFlip(card){
        game.flipCard(card.id, ()=>{setGameOver(true)}, ()=>{setCards([...game.cards])});
        setCards([...game.cards]);
    }

    return (
        <div>
            <Begin onHandleBegin={handleBegin} show={begin}></Begin>
            <GameBoard handleFlip={handleFlip} cards={cards}></GameBoard>
            <GameOver onHandleGameOver={handleGameOver} show={gameOver}></GameOver>
        </div>
    )
}
