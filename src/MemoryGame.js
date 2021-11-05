import React, {useEffect, useState} from 'react'
import GameOver from './components/GameOver';
import GameBoard from './components/GameBoard';
import game from './game/game';

export default function MemoryGame() {

    const [gameBoard, setGameBoard] = useState(false);
    const [gameOver, setGameOver] = useState(false);
    const [cards, setCards] = useState([]);

    useEffect(()=>{
        setCards(game.createCardFromLogos());
        setGameBoard(true);
    }, []);

    async function handleGameOver(){
        //game.restartCron();
        await window.location.reload();
        setGameBoard(false);
        setCards(game.createCardFromLogos());
    }

    function handleFlip(card){
        game.flipCard(card.id, ()=>{setGameOver(true)}, ()=>{setCards([...game.cards])});
        setCards([...game.cards]);
    }

    return (
        <div>
            <GameBoard handleFlip={handleFlip} cards={cards}></GameBoard>
            <GameOver onHandleGameOver={handleGameOver} show={gameOver}></GameOver>
        </div>
    )
}

//_________________________Increment later____________________________

//import Begin from './components/Begin';


    //const [begin, setBegin] = useState(true);

    //function handleBegin(){
    //    setBegin(false);
    //    setCards(game.createCardFromLogos());
    //    setGameBoard(true);
    //    game.startCron();
    //}

    {/* <Begin onHandleBegin={handleBegin} show={begin}></Begin> */}