import React from 'react'
import GameOver from './components/GameOver';
import GameBoard from './components/GameBoard';
import {ContextProvider} from './components/ContextAPI';

export default function MemoryGame() {

    return (
        <div>
            <ContextProvider>
                <GameBoard></GameBoard>
                <GameOver></GameOver>
            </ContextProvider>
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

    // <Begin onHandleBegin={handleBegin} show={begin}></Begin>